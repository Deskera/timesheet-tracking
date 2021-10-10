
--insert into role values(1,'admin');
--insert into role values(2,'user');
insert into role(role_id ,role_name) select 1,'admin' where not exists ( select role_id from role where role_id =1);
insert into role(role_id ,role_name) select 2,'user' where not exists ( select role_id from role where role_id =2);
