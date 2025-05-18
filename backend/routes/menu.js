import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const itens = await MenuItem.find();
  res.json(itens);
});

router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item não encontrado' });
    res.json(item);
  } catch {
    res.status(400).json({ error: 'ID inválido' });
  }
});

router.post('/', async (req, res) => {
  const { name, description, price } = req.body;
  if (!name || price == null) return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  const newItem = new MenuItem({ name, description, price });
  await newItem.save();
  res.status(201).json(newItem);
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Item não encontrado' });
    res.json(updated);
  } catch {
    res.status(400).json({ error: 'Dados inválidos' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Item não encontrado' });
    res.status(204).end();
  } catch {
    res.status(400).json({ error: 'ID inválido' });
  }
});

export default router;