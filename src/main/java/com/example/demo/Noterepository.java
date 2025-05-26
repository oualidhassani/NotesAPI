package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Noterepository extends JpaRepository<Note, Long>
{
}
