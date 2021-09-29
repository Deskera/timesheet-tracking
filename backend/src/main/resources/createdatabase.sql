create role testuser with login password 'test';
create database timetrackingdatabase with owner=testuser;
\c timetrackingdatabase
create table role(role_id bigint,role_name character varying(255),primary key (role_id));
alter table role owner to testuser;
insert into role values(1,'admin');
insert into role values(2,'user');
