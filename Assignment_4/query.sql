-- public.image definition

-- Drop table

-- DROP TABLE public.image;

CREATE TABLE public.image (
	id serial NOT NULL,
	image_path text NOT NULL,
	car_id int4 NOT NULL,
	created_date date NULL,
	CONSTRAINT image_pkey PRIMARY KEY (id)
);


-- public.make definition

-- Drop table

-- DROP TABLE public.make;

CREATE TABLE public.make (
	id serial NOT NULL,
	"name" text NULL,
	CONSTRAINT make_pkey PRIMARY KEY (id)
);


-- public.model definition

-- Drop table

-- DROP TABLE public.model;

CREATE TABLE public.model (
	id serial NOT NULL,
	"name" text NULL,
	CONSTRAINT model_pkey PRIMARY KEY (id)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial NOT NULL,
	username text NOT NULL,
	email text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);


-- public.car definition

-- Drop table

-- DROP TABLE public.car;

CREATE TABLE public.car (
	id serial NOT NULL,
	"name" text NOT NULL,
	make_id int4 NOT NULL,
	model_id int4 NOT NULL,
	image_path text NULL,
	CONSTRAINT car_pkey PRIMARY KEY (id),
	CONSTRAINT fk_make FOREIGN KEY (make_id) REFERENCES make(id) ON DELETE SET NULL,
	CONSTRAINT fk_model FOREIGN KEY (model_id) REFERENCES model(id) ON DELETE SET NULL
);