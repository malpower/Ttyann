var Ttyann=require("./littleT");
var http=require("http");
var qs=require("querystring");

var fs=require("fs");
var indexPage=fs.readFileSync("./index.html","utf8");

var whatIsCarl=undefined;

var knownMap=new Object;


Ttyann.addGrammer("请问??在吗",function(content,person,res,finder)
{
    res.context=function(content,person,res,finder)
    {
        res.context=null;
        res.response("好的，我会立即通知的！");
    };
    res.response("请问找他有什么是吗？");
});
Ttyann.addGrammer("请问???在吗",function(content,person,res,finder)
{
    finder("请问??在吗")(content,person,res,finder);
});
Ttyann.addGrammer("Caonima",function(content,person,res,finder)
{
    res.response("jjjj");
});
Ttyann.addGrammer("Carl是谁*",function(content,person,res,finder)
{
    res.response("Carl的中文名叫做诶赵，你可以联系他呀!");
});
Ttyann.addGrammer("*我*Carl的照片*",function(content,person,res,finder)
{
    res.response("你自己看吧。。。<br /><img src=\"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQTPo-Uk4DJwxRLeJD3ENps5J5vE1foYdx5_OHWuYshtB_fpNjD\" />");
});
Ttyann.addGrammer("*我*Carl他的照片*",function(content,person,res,finder)
{
    finder("*我*Carl的照片*").fn(content,person,res,finder);
});
Ttyann.addGrammer("*我叫*",function(content,person,res,finder,args)
{
    person.name=args[1];
    res.response("你好呀"+person.name);
});
Ttyann.addGrammer("*是*",function(content,person,res,finder,args)
{
    args[0]=args[0].replace(/你/g,"我");
    args[0]=args[0].replace(/我/g,person.name);
    if (args[1].indexOf("什么")==-1 && args[1].indexOf("啥")==-1 && args[1].indexOf("谁")==-1)
    {
        knownMap[args[0]]=args[1];
        res.response("谢谢你告诉我~");
        return;
    }
    else
    {
        if (typeof(knownMap[args[0]])!="string")
        {
            res.response("我不知道耶，傻傻分不清~");
            return;
        }
        else
        {
            res.response(args[0]+"是"+knownMap[args[0]]);
            return;
        }
    }
    res.response("啦啦，我傻了~");
});


Ttyann.addGrammer("*在*",function(content,person,res,finder,args)
{
    args[0]=args[0].replace(/你/g,"我");
    args[0]=args[0].replace(/我/g,person.name);
    if (args[1].indexOf("哪里")==-1 && args[1].indexOf("哪")==-1)
    {
        knownMap[args[0]]=args[1];
        res.response("谢谢你告诉我~");
        return;
    }
    else
    {
        if (typeof(knownMap[args[0]])!="string")
        {
            res.response("我不知道耶，傻傻分不清~");
            return;
        }
        else
        {
            res.response(args[0]+"在"+knownMap[args[0]]);
            return;
        }
    }
    res.response("啦啦，我傻了~");
});

Ttyann.showTree();

        

var x=new Ttyann.Ttyann("malpower");
x.setDefaultResponser(function(content,person,res,finder)
{
    res.response("DEFAULT!");
});

var server=http.createServer(function(req,res)
{
    if (req.url=="/")
    {
        res.end(indexPage);
        return;
    }
    if (req.url=="/ask")
    {
        x.bindOutput(function(content)
        {
            res.end(content);
        });
        var buff=new Buffer(0);
        req.on("data",function(chunk)
        {
            buff=Buffer.concat([buff,chunk]);
        }).on("end",function()
        {
            var o=qs.parse(buff.toString("utf8"));
            var o=o.ask;
            res.writeHead(200,{"content-type": "text/html;charset=utf-8"});
            x.tell(o);
        }).on("error",function(err)
        {
            console.log(err);
        });
    }
    else
    {
        res.end("404");
    }
});

server.listen(8811);




        