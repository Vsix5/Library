id: UUID  PRIMARY KEY
title: TEXT  NOT NULL
author: TEXT NOT NULL
category: TEXT NOT NULL
isbn: TEXT;
description: TEXT NOT NULL
pages: INTEGER NOT NULL
price: NUMERIC(10, 2) NOT NULL
status: TEXT 
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP


create TABLE books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  isbn TEXT,
  description TEXT NOT NULL,
  pages INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  status TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)