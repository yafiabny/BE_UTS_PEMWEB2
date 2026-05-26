import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import { Pembicara } from "../types/pembicara.js";


export const createPembicara = async (req: Request, res: Response) => {
    try {
        const { name, title, bio, photo, expertise } = req.body as Pembicara;

        if (!name || !title || !bio) {
            return res.status(400).json({ message: "Nama, title, dan bio wajib diisi" });
        }

        const newPembicara = await prisma.pembicara.create({
            data: {
                name,
                title,
                bio,
                photo: photo || "",
                expertise: expertise || [],
            },
        });

        res.status(201).json({ message: "Pembicara berhasil dibuat", data: newPembicara });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat pembicara", error });
    }
};


export const getPembicaras = async (req: Request, res: Response) => {
    try {
        const pembicaras = await prisma.pembicara.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(pembicaras);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data pembicara", error });
    }
};


export const getPembicaraById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const pembicara = await prisma.pembicara.findUnique({ where: { id } });

        if (!pembicara) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }

        res.json(pembicara);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil detail pembicara", error });
    }
};


export const updatePembicara = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingPembicara = await prisma.pembicara.findUnique({ where: { id } });

        if (!existingPembicara) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }

        const { name, title, bio, photo, expertise } = req.body as Pembicara;

        const updatedPembicara = await prisma.pembicara.update({
            where: { id },
            data: {
                name: name ?? existingPembicara.name,
                title: title ?? existingPembicara.title,
                bio: bio ?? existingPembicara.bio,
                photo: photo ?? existingPembicara.photo,
                expertise: expertise ?? existingPembicara.expertise,
            },
        });

        res.json({ message: "Pembicara berhasil diupdate", data: updatedPembicara });
    } catch (error) {
        res.status(500).json({ message: "Gagal update pembicara", error });
    }
};


export const deletePembicara = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingPembicara = await prisma.pembicara.findUnique({ where: { id } });

        if (!existingPembicara) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }

        await prisma.pembicara.delete({ where: { id } });
        res.json({ message: "Pembicara berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus pembicara", error });
    }
};
