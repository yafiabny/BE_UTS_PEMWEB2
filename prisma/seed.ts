import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Memulai proses seeding database...\n");


    console.log("Menghapus data yang sudah ada...");
    await prisma.user.deleteMany();
    await prisma.event.deleteMany();
    await prisma.pembicara.deleteMany();
    await prisma.categoryEvent.deleteMany();
    console.log("Semua data lama berhasil dihapus!\n");


    console.log("Membuat data kategori event...");
    const catSeminar     = await prisma.categoryEvent.create({ data: { name: "Seminar" } });
    const catWorkshop    = await prisma.categoryEvent.create({ data: { name: "Workshop" } });
    const catTalkshow    = await prisma.categoryEvent.create({ data: { name: "Talkshow" } });
    const catCompetition = await prisma.categoryEvent.create({ data: { name: "Competition" } });
    console.log(`    4 kategori berhasil dibuat\n`);


    console.log("Membuat data pembicara...");

    const dery = await prisma.pembicara.create({
        data: {
            name: "Dery Agung Triyadi",
            title: "Cloud Architect — AWS Indonesia",
            bio: "Praktisi cloud berpengalaman dari AWS Indonesia yang fokus pada implementasi arsitektur cloud scalable dan integrasi kecerdasan buatan dalam ekosistem enterprise.",
            photo: "/assets/Dery.png",
            expertise: ["Cloud Computing", "AWS", "AI Integration"],
        },
    });

    const sowam = await prisma.pembicara.create({
        data: {
            name: "Sowam Habibi",
            title: "AI Engineer — Google Indonesia",
            bio: "Engineer sekaligus evangelist teknologi dari Google Indonesia dengan keahlian mendalam di bidang machine learning dan pemanfaatan platform Google Cloud untuk solusi bisnis.",
            photo: "/assets/Sowam.png",
            expertise: ["Artificial Intelligence", "Machine Learning", "Google Cloud"],
        },
    });

    const lhuqita = await prisma.pembicara.create({
        data: {
            name: "Lhuqita Fazry",
            title: "Mobile Developer & Founder Rumah Coding Indonesia",
            bio: "Pengembang aplikasi mobile sekaligus pendiri Rumah Coding Indonesia, aktif mendorong literasi pemrograman di kalangan generasi muda melalui pelatihan dan mentoring.",
            photo: "/assets/lhuqita.png",
            expertise: ["Mobile Development", "React Native", "Flutter"],
        },
    });

    const dendi = await prisma.pembicara.create({
        data: {
            name: "M. Dendi Purwanto",
            title: "Software Engineer — PT. Mayar Kernel Supernova",
            bio: "Software engineer berfokus pada pengembangan sistem berbasis kecerdasan buatan di PT. Mayar Kernel Supernova, dengan rekam jejak riset dan implementasi machine learning skala produksi.",
            photo: "/assets/dendi.png",
            expertise: ["Artificial Intelligence", "Machine Learning", "Python"],
        },
    });

    console.log(`    4 pembicara berhasil dibuat\n`);


    console.log("Membuat data event...");

    await prisma.event.create({
        data: {
            name: "IT Seminar — Human-AI Integration",
            categoryId: catSeminar.id,
            pembicaraId: dery.id,
            location: "Aula Gedung C, Kampus 1 (Mataram) Universitas Harkat Negeri",
            dateEvent: new Date("2025-11-27"),
            description:
                'Seminar nasional bertema "Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif" menghadirkan diskusi strategis mengenai bagaimana manusia dan kecerdasan buatan dapat bersinergi secara optimal dalam berbagai sektor industri, bukan bersaing satu sama lain.',
        },
    });

    await prisma.event.create({
        data: {
            name: "IT Workshop — AI for a Sustainable Future",
            categoryId: catWorkshop.id,
            pembicaraId: lhuqita.id,
            location: "Lab Komputer D.1 & D.2, Kampus 1 Universitas Harkat Negeri",
            dateEvent: new Date("2025-11-25"),
            description:
                'Workshop bertajuk "AI for a Sustainable Future: The Role of Z Generation in the Digital Era" dirancang untuk menjembatani potensi Generasi Z dengan kemampuan AI dalam membangun solusi digital yang berkelanjutan dan berdampak nyata bagi masyarakat.',
        },
    });

    await prisma.event.create({
        data: {
            name: "IT Talkshow — Humanizing Technology",
            categoryId: catTalkshow.id,
            pembicaraId: sowam.id,
            location: "Aula Gedung C, Kampus 1 (Mataram) Universitas Harkat Negeri",
            dateEvent: new Date("2025-11-24"),
            description:
                'Talkshow interaktif "Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan" membahas pendekatan humanis dalam pengembangan teknologi AI, menekankan pentingnya nilai-nilai kemanusiaan sebagai landasan inovasi digital yang bertanggung jawab.',
        },
    });

    await prisma.event.create({
        data: {
            name: "IT Competition — From Creation to Innovation",
            categoryId: catCompetition.id,
            pembicaraId: dendi.id,
            location: "Kampus 1 Universitas Harkat Negeri",
            dateEvent: new Date("2025-11-20"),
            description:
                'Kompetisi IT bertemakan "From Creation to Innovation" mengundang para talenta digital muda untuk unjuk kemampuan dalam merancang dan mengembangkan solusi teknologi yang inovatif, berdampak luas, dan berorientasi pada keberlanjutan.',
        },
    });

    console.log(`    4 event berhasil dibuat\n`);


    console.log("Membuat data user...");

    const hashedPassword = await bcrypt.hash("password123", 10);

    await prisma.user.create({
        data: {
            name: "Mahasiswa Test",
            nim: "12345678",
            password: hashedPassword,
            bio: "Mahasiswa D4 Teknik Informatika Universitas Harkat Negeri yang aktif mengikuti berbagai kegiatan teknologi, pengembangan software, dan kompetisi pemrograman.",
            event: "INVOFEST 2025",
        },
    });

    console.log(`    1 user berhasil dibuat (NIM: 12345678 | Password: password123)\n`);

    console.log("======================================================");
    console.log("Seeding selesai! Database berhasil diisi dengan data awal.");
    console.log("======================================================");
}

main()
    .catch((e) => {
        console.error("Terjadi error saat proses seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
