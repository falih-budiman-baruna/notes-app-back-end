const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => { //menambahkan note baru dengan id serta tanggal sendiri, dan judul, tag, serta body yang
    const {title, tags, body} = request.payload; //telah ditulis oleh user <------

    const id = nanoid(16); //membuat id baru dari nanoid

    const createdAt = new Date().toISOString(); //tanggal update dan terbuat yang terbaru
    const updatedAt = createdAt; 

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    }; 

    notes.push(newNote); //data tersebut dimasukkan kedalam array

    const isSuccess = notes.filter((note) => note.id === id).length > 0; //memastikan bahwa id terbuat, dan memiliki nilai

    if (isSuccess) { //jika id sukses terbuat
        const response = h.response({
            status:'success',
            message:'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        
        response.code(201);
        return response;

    }

    const response = h.response ({
        status:'fail',
        message:'Catatan gagal ditambahkan',
    });
    
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({ //Memberikan preview note yang sudah dibuat
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h) => { //Menampilkan note spesifik berdasarkan id yang telah dibuat
    const { id } = request.params; //memanggil note berdasarkan Id yang diinginkan
    const note = notes.filter((n) => n.id === id)[0]; //mencari note yang sesuai id tersebut

    if (note !== undefined) { //jika ditemukan id sama, menunjukkan note
        return {
          status: 'success',
          data: {
            note,
          },
        };
      }
    
    const response = h.response ({ //jika tidak ditemukan id sama
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response; 
    
};

const editNoteByIdHandler = (request, h) => { 
    const {id} = request.params; //memanggil note berdasarkan Id
    const {title, tags, body} = request.payload; //menerima judul, tag, dan body baru

    const updatedAt = new Date().toISOString(); //memberikan tanggal update baru

    const index = notes.findIndex((note) => note.id === id); //mencari index node berdasarkan id

    if (index !== -1) { //jika index ditemukan, array notes berdasarkan index tersebut diganti
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response ({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.reponse ({ //jika tidak ditemukan
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => { //menghapus note spesifik berdasarkan id yang dibuat
    const {id} = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) { //jika index ditemukan, array notes berdasarkan index tersebut didelete
        notes.splice(index, 1); //menggunakan splice()
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        })
        response.code(200);
        return response;
        };

    const response = h.response({ //Jika index tidak ditemukan
        status: "fail",
        message: 'Catatan gagal dihapus karena id tidak ditemukan',
    });
    response.code (404);
    return response;
};

module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};