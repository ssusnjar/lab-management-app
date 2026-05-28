const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API radi');
});

// ---------- NALOZI ----------

app.get('/api/nalozi', async (req, res) => {
  try {
    const nalozi = await prisma.nalog.findMany({
      include: { uzorci: true },
      orderBy: { id: 'desc' },
    });
    res.json(nalozi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greska pri dohvacanju naloga' });
  }
});

app.get('/api/nalozi/:id', async (req, res) => {
  try {
    const nalog = await prisma.nalog.findUnique({
      where: { id: Number(req.params.id) },
      include: { uzorci: true },
    });
    if (!nalog) return res.status(404).json({ error: 'Nalog ne postoji' });
    res.json(nalog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greska pri dohvacanju naloga' });
  }
});

app.post('/api/nalozi', async (req, res) => {
  try {
    const { brojRadnogNaloga, narucitelj, gradiliste, datum } = req.body;
    const nalog = await prisma.nalog.create({
      data: {
        brojRadnogNaloga,
        narucitelj,
        gradiliste,
        datum: new Date(datum),
      },
    });
    res.status(201).json(nalog);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Neispravni podaci za nalog' });
  }
});

app.put('/api/nalozi/:id', async (req, res) => {
  try {
    const { brojRadnogNaloga, narucitelj, gradiliste, datum } = req.body;
    const nalog = await prisma.nalog.update({
      where: { id: Number(req.params.id) },
      data: {
        brojRadnogNaloga,
        narucitelj,
        gradiliste,
        datum: datum ? new Date(datum) : undefined,
      },
    });
    res.json(nalog);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Greska pri azuriranju naloga' });
  }
});

app.delete('/api/nalozi/:id', async (req, res) => {
  try {
    await prisma.nalog.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Greska pri brisanju naloga' });
  }
});

// ---------- UZORCI ----------

app.get('/api/uzorci', async (req, res) => {
  try {
    const uzorci = await prisma.uzorak.findMany({
      include: { nalog: true, ispitivanje: true },
      orderBy: { id: 'desc' },
    });
    res.json(uzorci);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greska pri dohvacanju uzoraka' });
  }
});

app.get('/api/uzorci/:id', async (req, res) => {
  try {
    const uzorak = await prisma.uzorak.findUnique({
      where: { id: Number(req.params.id) },
      include: { nalog: true, ispitivanje: true },
    });
    if (!uzorak) return res.status(404).json({ error: 'Uzorak ne postoji' });
    res.json(uzorak);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greska pri dohvacanju uzorka' });
  }
});

app.post('/api/uzorci', async (req, res) => {
  try {
    const { laboratorijskaOznaka, lokacija, nalogId } = req.body;
    const uzorak = await prisma.uzorak.create({
      data: {
        laboratorijskaOznaka,
        lokacija,
        nalogId: Number(nalogId),
      },
    });
    res.status(201).json(uzorak);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Neispravni podaci za uzorak' });
  }
});

app.put('/api/uzorci/:id', async (req, res) => {
  try {
    const { laboratorijskaOznaka, lokacija, nalogId } = req.body;
    const uzorak = await prisma.uzorak.update({
      where: { id: Number(req.params.id) },
      data: {
        laboratorijskaOznaka,
        lokacija,
        nalogId: nalogId !== undefined ? Number(nalogId) : undefined,
      },
    });
    res.json(uzorak);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Greska pri azuriranju uzorka' });
  }
});

app.delete('/api/uzorci/:id', async (req, res) => {
  try {
    await prisma.uzorak.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Greska pri brisanju uzorka' });
  }
});

// ---------- ISPITIVANJA ----------

app.get('/api/ispitivanja', async (req, res) => {
  try {
    const ispitivanja = await prisma.ispitivanje.findMany({
      include: { uzorak: true },
      orderBy: { id: 'desc' },
    });
    res.json(ispitivanja);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greska pri dohvacanju ispitivanja' });
  }
});

app.get('/api/ispitivanja/:id', async (req, res) => {
  try {
    const ispitivanje = await prisma.ispitivanje.findUnique({
      where: { id: Number(req.params.id) },
      include: { uzorak: true },
    });
    if (!ispitivanje) return res.status(404).json({ error: 'Ispitivanje ne postoji' });
    res.json(ispitivanje);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greska pri dohvacanju ispitivanja' });
  }
});

app.post('/api/ispitivanja', async (req, res) => {
  try {
    const { visina, sirina, sila, cvrstoca, datumIspitivanja, uzorakId } = req.body;
    const ispitivanje = await prisma.ispitivanje.create({
      data: {
        visina: visina !== undefined ? Number(visina) : null,
        sirina: sirina !== undefined ? Number(sirina) : null,
        sila: sila !== undefined ? Number(sila) : null,
        cvrstoca: cvrstoca !== undefined ? Number(cvrstoca) : null,
        datumIspitivanja: datumIspitivanja ? new Date(datumIspitivanja) : undefined,
        uzorakId: Number(uzorakId),
      },
    });
    res.status(201).json(ispitivanje);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Neispravni podaci za ispitivanje' });
  }
});

app.put('/api/ispitivanja/:id', async (req, res) => {
  try {
    const { visina, sirina, sila, cvrstoca, datumIspitivanja, uzorakId } = req.body;
    const ispitivanje = await prisma.ispitivanje.update({
      where: { id: Number(req.params.id) },
      data: {
        visina: visina !== undefined ? Number(visina) : undefined,
        sirina: sirina !== undefined ? Number(sirina) : undefined,
        sila: sila !== undefined ? Number(sila) : undefined,
        cvrstoca: cvrstoca !== undefined ? Number(cvrstoca) : undefined,
        datumIspitivanja: datumIspitivanja ? new Date(datumIspitivanja) : undefined,
        uzorakId: uzorakId !== undefined ? Number(uzorakId) : undefined,
      },
    });
    res.json(ispitivanje);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Greska pri azuriranju ispitivanja' });
  }
});

app.delete('/api/ispitivanja/:id', async (req, res) => {
  try {
    await prisma.ispitivanje.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Greska pri brisanju ispitivanja' });
  }
});

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
