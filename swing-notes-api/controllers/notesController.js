// notesController.js
import pool from '../models/pool.js';

// Get all notes for a user
export const getNotes = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query('SELECT * FROM notes WHERE userId = $1', [userId]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to get notes' });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  const { title, text } = req.body;
  const userId = req.userId;

  if (!title || !text) {
    return res.status(400).json({ error: 'Title and text are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO notes (title, text, userId) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [title, text, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  const { id, title, text } = req.body;
  const userId = req.userId;

  try {
    const result = await pool.query(
      `UPDATE notes 
       SET title = $1, text = $2, modifiedAt = CURRENT_TIMESTAMP 
       WHERE id = $3 AND userId = $4 
       RETURNING *`,
      [title, text, id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to update note' });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  const { id } = req.body;
  const userId = req.userId;

  try {
    const result = await pool.query(
      'DELETE FROM notes WHERE id = $1 AND userId = $2 RETURNING *',
      [id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to delete note' });
  }
};

// Search notes by title 
export const searchNotes = async (req, res) => {
  const { q } = req.query;
  const userId = req.userId;
  if (!q) {
    return res.status(400).json({ error: 'Missing search keyword (q)' });
  }
  try {
    const result = await pool.query(
      `SELECT * FROM notes 
       WHERE userId = $1 AND LOWER(title) LIKE LOWER($2)`,
      [userId, `%${q}%`]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to search notes' });
  }
};
