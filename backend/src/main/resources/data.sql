--insert into role values(1,'admin');
--insert into role values(2,'user');
insert into role(rid,role_name) select 1,'admin' where not exists ( select rid from role where rid=1);
insert into role(rid,role_name) select 2,'user' where not exists ( select rid from role where rid=2);