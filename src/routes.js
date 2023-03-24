const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [
    {
      method: 'POST',
      path: '/notes',
      handler: addNoteHandler, //menambah catatan
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler, //mempreview catatan
      },
      {
        method: 'GET',
        path: '/notes/{id}', //menerima note berdasarkan id yang dibuat
        handler: getNoteByIdHandler, //membuka catatan spesifik
      },
      {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler, //mengedit catatan
      },
      {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler, //Menghapus catatan
      },
  ];
   
  module.exports = routes;