const { nanoid } = require('nanoid');
const notes = require('./notes');

// add new note function

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt ;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  // push new note
  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0 ;

  if (isSuccess) {
    const response = h.response({
      status : 'success',
      message : 'catatan berhasil ditambahkan',
      data : {
        noteId : id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status : 'fail',
    message : 'catatan gagal ditambahkan',
  });
  response.code(500);
  return reponse;

};
//view note function

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((note) => note.id === id) [0];

  if (note !== undefined) {
    return {
      status: 'success',
      data:{
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',

  });

  response.code(404);
  return response;
};

//edit function

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'catatan berhasil diubah',
      noteid: id

    });
    response.code(200);
    return response;
  } else {

    const response = h.response({
      status: 'fail',
      message: 'gagal memperbarui catatan. id tidak ditemukan',
      noteid: id
    });
    response.code(404);
    return response;
  }
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'pesan gagal dihapus',
      noteid : id,
    });
    response.code(404);
    return response;
  }
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler
} ;

