package com.example.demo;

import jakarta.persistence.*;

@Entity
public class Note
{
	@Id
	@GeneratedValue
	private long id;
	private String title;
	private String content;
	
	public Note() {};

	Note(String _title, String _content)
    {
        this.title = _title;
        this.content = _content;
    };

    public long getId() {return id;}
    public String getTitle() {return title;}
    public String getContent() {return content;}

    public void setId(long _id) {this.id = _id;}
    public void setTitle(String _title) {this.title = _title;}
    public void setContent(String _content) {this.content = _content;}
    
 }