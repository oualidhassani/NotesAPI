package com.example.demo.service;

import com.example.demo.Note;
import com.example.demo.Noterepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NoteService
{
    @Autowired
    private Noterepository noterepository;

    public List<Note> getAllNotes()
    {
        return noterepository.findAll();
    } 
    public Optional<Note> getOptional(Long id)
    {
        return noterepository.findById(id);
    }
    public Note createNote(Note note)
    {
        return noterepository.save(note);
    }
    public Optional<Note> UpdateNote(Long id,Note noteupdated)
    {
        return noterepository.findById(id).map(note->{
            note.setTitle(noteupdated.getTitle());
            note.setContent(noteupdated.getContent());
            return noterepository.save(note);
        });
    }
    public void delNotes(Long id)
    {
         noterepository.deleteById(id);
    }
   
}
// List<Note> note = Noterepository.findAll();

