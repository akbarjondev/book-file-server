create database edo_books;

create table books(
	book_id serial primary key,
	book_unique_id varchar(72),
	book_size varchar(72),
	book_uploaded_at timestamptz default current_timestamp,
	book_path text
);
