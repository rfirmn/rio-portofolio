import { NextResponse } from "next/server";
import { GITHUB_CALENDAR_SVG, GITHUB_INITIAL_STATS } from "@/components/sections/github-svg-data";

export const revalidate = 604800; // 1 week in seconds (7 * 24 * 60 * 60)

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeekDay extends ContributionDay {
  dayOfWeek: number;
}

const LEVEL_CLASSES = [
  "fill-foreground/10",
  "fill-sky-900/35",
  "fill-sky-700/55",
  "fill-sky-500/80",
  "fill-sky-400",
];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildSvg(contributions: ContributionDay[]): string {
  const weeks: ContributionWeekDay[][] = [];
  let currentWeek: ContributionWeekDay[] = [];

  contributions.forEach((day) => {
    const dateObj = new Date(day.date + "T00:00:00Z");
    const dayOfWeek = dateObj.getUTCDay();
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push({
      date: day.date,
      count: day.count,
      level: day.level,
      dayOfWeek,
    });
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  let monthLabelsXml = "";
  let lastMonth = -1;

  weeks.forEach((week, wIdx) => {
    const firstDayDate = new Date(week[0].date + "T00:00:00Z");
    const m = firstDayDate.getUTCMonth();
    if (m !== lastMonth) {
      const xPos = 22 + wIdx * 13;
      monthLabelsXml += `<text x="${xPos}" y="15">${MONTH_NAMES[m]}</text>`;
      lastMonth = m;
    }
  });

  let rectsXml = "";
  weeks.forEach((week, wIdx) => {
    week.forEach((day) => {
      const x = wIdx * 13;
      const y = day.dayOfWeek * 13;
      const fill = LEVEL_CLASSES[day.level] || LEVEL_CLASSES[0];
      const title = `${day.count} contributions on ${day.date}`;
      rectsXml += `<rect class="contrib-cell cursor-pointer transition-colors duration-150 ${fill} hover:stroke-foreground/20 hover:stroke-[1.5px]" width="10" height="10" rx="2" ry="2" x="${x}" y="${y}" data-date="${day.date}" data-count="${day.count}"><title>${title}</title></rect>`;
    });
  });

  return `<svg width="720" height="125" viewBox="0 0 720 125" class="mx-auto"><g class="text-[9px] font-medium fill-foreground/45 select-none">${monthLabelsXml}</g><g class="text-[8px] font-medium fill-foreground/35 select-none" transform="translate(0, 20)"><text x="0" y="18">Mon</text><text x="0" y="44">Wed</text><text x="0" y="70">Fri</text></g><g class="contrib-grid" transform="translate(22, 20)">${rectsXml}</g></svg>`;
}

export async function GET() {
  try {
    const res = await fetch("https://github-contributions-api.jogruber.de/v4/rfirmn?y=last", {
      next: { revalidate: 604800 }, // 1 week in seconds
    });

    if (!res.ok) {
      throw new Error(`GitHub contributions API returned ${res.status}`);
    }

    const data = await res.json();
    const contributions: ContributionDay[] = data.contributions || [];
    const total = data.total?.lastYear || contributions.reduce((acc, c) => acc + c.count, 0);
    const activeDays = contributions.filter((c) => c.count > 0).length;

    let maxStreak = 0;
    let currentStreak = 0;
    contributions.forEach((c) => {
      if (c.count > 0) {
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
      } else {
        currentStreak = 0;
      }
    });

    const svg = buildSvg(contributions);

    return NextResponse.json(
      {
        success: true,
        username: "rfirmn",
        total,
        activeDays,
        longestStreakDays: maxStreak,
        svg,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    console.error("Error fetching live GitHub contributions for rfirmn:", err);

    // Fallback to precalculated authentic baseline
    return NextResponse.json(
      {
        success: true,
        username: "rfirmn",
        total: GITHUB_INITIAL_STATS.total,
        activeDays: GITHUB_INITIAL_STATS.activeDays,
        longestStreakDays: GITHUB_INITIAL_STATS.maxStreak,
        svg: GITHUB_CALENDAR_SVG,
        updatedAt: GITHUB_INITIAL_STATS.updatedAt,
        isFallback: true,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400",
        },
      }
    );
  }
}
