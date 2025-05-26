package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Note;
import com.example.demo.Noterepository;
import com.example.demo.service.NoteService;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/notes")

public class NoteController 
{
    @Autowired
    private NoteService  service;
    
    // public NoteController(NoteService service) {
    //     this.service = service;
    // }
    @GetMapping
    public List<Note> getAllNotes()
    {
        return service.getAllNotes();
    }

    @GetMapping("/{id}")
    public Optional<Note> getNotebyId(@PathVariable Long id)
    {
        return service.getOptional(id);
    }   

    @PostMapping
    public Note postMethodName (@RequestBody Note entity) 
    {
        return service.createNote(entity);
    }
    

    @PutMapping("/{id}")
    public Optional<Note> putMethodName(@PathVariable Long id, @RequestBody Note entity) 
    {
        return service.UpdateNote(id, entity);
    }

    @DeleteMapping("/{id}")
    public void DeleteMethode(@PathVariable Long id)
    {
        service.delNotes(id);
    }
}