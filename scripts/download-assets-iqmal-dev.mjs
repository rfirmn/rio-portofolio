import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = [
  {
    url: 'https://iqmal.dev/iqmal.png',
    dest: 'public/sites/iqmal-dev-e1babc1b/shared/iqmal.png'
  },
  {
    url: 'https://iqmal.dev/icon.svg',
    dest: 'public/sites/iqmal-dev-e1babc1b/shared/icon.svg'
  },
  // Experiences
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/experiences/komatsu-remanufacturing-asia/komatsu-14b3b5d7fd31.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/komatsu-14b3b5d7fd31.webp'
  },
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/experiences/institut-teknologi-kalimantan/itk-f8c0adea3d0b.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/itk-f8c0adea3d0b.webp'
  },
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/experiences/binar-academy/binar-f68446776382.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/binar-f68446776382.webp'
  },
  // KRA LMS
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/projects/kra-lms/admin-dashboard-e43848556db8.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/admin-dashboard-e43848556db8.webp'
  },
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/projects/kra-lms/training-schedule-4331c93fa958.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/training-schedule-4331c93fa958.webp'
  },
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/projects/kra-lms/course-eb539a34dcd9.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/course-eb539a34dcd9.webp'
  },
  // Flight Booking
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/projects/flight-booking/homepage-7b75f071a235.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/homepage-7b75f071a235.webp'
  },
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/projects/flight-booking/select-flight-33c2f384411c.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/select-flight-33c2f384411c.webp'
  },
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/projects/flight-booking/payment-e6d9f1161fdc.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/payment-e6d9f1161fdc.webp'
  },
  // Kalimantan Biodiversity
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/projects/kalimantan-biodiversity-portal/overview-3c0148d7d7cc.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/overview-3c0148d7d7cc.webp'
  },
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/projects/kalimantan-biodiversity-portal/species-detail-d497900f906c.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/species-detail-d497900f906c.webp'
  },
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/projects/kalimantan-biodiversity-portal/species-distribution-map-284702c0bf32.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/species-distribution-map-284702c0bf32.webp'
  },
  // Portfolio
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/projects/new-portfolio/hero-fullstack-overview-324fcf78fb05.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/hero-fullstack-overview-324fcf78fb05.webp'
  },
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/projects/new-portfolio/experiences-one-two-fc5ec8063a46.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/experiences-one-two-fc5ec8063a46.webp'
  },
  {
    url: 'https://vnsqttcwdqoqdcgvlmmm.supabase.co/storage/v1/object/public/portfolio-media/98d5c2f0-fff2-48d9-9a29-7dbf09d285c3/legacy/projects/new-portfolio/projects-showcase-365e7c21c0e7.webp',
    dest: 'public/sites/iqmal-dev-e1babc1b/root-8a5edab2/projects-showcase-365e7c21c0e7.webp'
  }
];

function download(item) {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(process.cwd(), item.dest);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const file = fs.createWriteStream(filePath);
    https.get(item.url, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return reject(new Error(`Failed to get '${item.url}' (${res.statusCode})`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded ${item.dest}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      reject(err);
    });
  });
}

async function main() {
  console.log(`Starting download of ${assets.length} assets...`);
  for (const item of assets) {
    try {
      await download(item);
    } catch (e) {
      console.error(`✗ Error downloading ${item.url}:`, e.message);
    }
  }
  console.log('All assets processed!');
}

main();
