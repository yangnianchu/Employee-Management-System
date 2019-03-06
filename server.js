const mysql = require("mysql");
const express = require("express");
const static = require("express-static");
const url = require("url");
const server = express();
const port = 81;

const db = mysql.createConnection({
	host:"localhost",
	user:"root",
	port:"3307",
	password:"123456",
	database:"test"
})
db.connect();
//注册
server.get("/addUser",(request,response)=>{
	var parse = url.parse(request.url,true).query;
	var username = parse.username;
	var password = parse.password;
	var name = parse.name;
	var age = parse.age;
	var sex = parse.sex;
	var address = parse.address;
	if(username && password){
		db.query(`insert into shuju (username,password,name,age,sex,address) values ("${username}","${password}","${name}","${age}","${sex}","${address}")`,(error,data)=>{
			if(error){
				console.log("写入新用户失败！");
				response.end("error");
			}else{
				console.log(`写入新用户成功！用户名:${username}密码:${password}姓名:${name}年龄:${age}性别:${sex}住址:${address}`);
				response.end("success");
			}
		})
	}else{
		console.log("写入新用户失败！");
		response.end("error");
	}
})
//登录
// server.get("/denglu",(request,response)=>{
// 	var parse = url.parse(request.url,true).query;
// 	var username = parse.username;
// 	var password = parse.password;
// 	if(username && password){
// 		db.query(`SELECT * FROM shuju`,(error,data)=>{
// 			var suo = false;
// 			for(let i = 0;i < data.length;i++){
// 				if(username == data[i].username && password == data[i].password){
// 					suo = true;
// 					console.log("登录成功！");
// 					response.end("success");
// 				}
// 			}
// 			if(!suo){
// 				console.log("登录失败！");
// 				response.end("error");
// 			}
// 		})
// 	}
// })
//查询
server.get("/chaxun",(request,response)=>{
	db.query(`SELECT * FROM shuju`,(error,data)=>{
		if (error) {
			console.log("查询失败");
			response.end("error");
		}else{
			console.log("查询成功");
			response.end(JSON.stringify(data));
		}
	})
})
//删除数据
server.get("/delete",(request,response)=>{
	var id = url.parse(request.url,true).query.id;
	db.query(`DELETE FROM shuju WHERE id="${id}"`,(error,data)=>{
		if(error){
			console.log("删除失败");
			response.end("error");
		}else{
			console.log("删除成功");
			response.end("success");
		} 
	})
})
//修改数据库
server.get("/yes",(request,response)=>{
	var parse = url.parse(request.url,true).query;
	var username = parse.username;
	var password = parse.password;
	var name = parse.name;
	var age = parse.age;
	var sex = parse.sex;
	var address = parse.address;
	var id = parse.id;
	if(username && password && name && age && sex && address){
		db.query(`UPDATE shuju SET username="${username}",password="${password}",name="${name}",age="${age}",sex="${sex}",address="${address}" WHERE id="${id}"`,(error,data)=>{
			if(error){
				console.log("修改用户失败！");
				response.end("error");
			}else{
				console.log(`修改新用户成功！用户名:${username}密码:${password}姓名:${name}年龄:${age}性别:${sex}住址:${address}id=${id}`);
				response.end("success");
			}
		})
	}else{
		console.log("修改新用户失败！");
		response.end("error");
	}
})





server.listen(port);
server.use(static(__dirname + "/static"));
console.log(port + "端口运行中...");