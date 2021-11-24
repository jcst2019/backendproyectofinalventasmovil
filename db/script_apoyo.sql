    SELECT
        u.id,
        u.email,
        u.name,
        u.lastname,
        u.image,
        u.phone,
        u.password,
        u.session_token,
		json_agg(
			json_build_object(
				'id', r.id,
				'name', r.name,
				'image',r.image,
				'route',r.route
			)
		) as roles
    FROM
        users AS u
	INNER JOIN
	   user_has_roles AS uhr
	ON 
	  u.id = uhr.id_user
	INNER JOIN
	   	roles AS r
	ON
	  r.id = uhr.id_rol
    WHERE
        u.email = 'juansolar4@gmail.com'
    GROUP BY u.id
	
--"[{"id" : 1, "name" : "CLIENTE", "image" : null, "route" : "client/products/list"}, {"id" : 2, "name" : "VENDEDOR", "image" : null, "route" : "vendedor/orden/list"}]"
    