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
    finder("请问??在吗").fn(content,person,res,finder);
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
    res.response("你好呀!我们已经是朋友了！就叫你"+person.name+"桑好了![\:)]");
});
Ttyann.addGrammer("我叫*",function(content,person,res,finder,args)
{
    var rlt=finder("你好，我叫"+args[0]);
    rlt.fn(content,person,res,finder,rlt.stack);
});
Ttyann.addGrammer("*是*",function(content,person,res,finder,args)
{
    console.log("---------");
    console.log(args);
    console.log("*********");
    if (args.length!=2)
    {
        res.response("是什么呀！！");
        return;
    }
    args[0]=args[0].replace(/你/g,"我");
    args[0]=args[0].replace(/我/g,person.name);
    if (args[1].indexOf("什么")==-1 && args[1].indexOf("啥")==-1 && args[1].indexOf("谁")==-1 && args[1].indexOf("多少")==-1)
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


var whoMap=new Object;
Ttyann.addGrammer("*找*",function(content,person,res,finder,args)
{
    if (args.length!=2)
    {
        res.response("找什么呀！！");
        return;
    }
    args[0]=args[0].replace(/你/g,"我");
    args[0]=args[0].replace(/我/g,person.name);
    if (args[1].indexOf("什么")==-1 && args[1].indexOf("啥")==-1 && args[1].indexOf("谁")==-1 && args[1].indexOf("多少")==-1)
    {
        whoMap[args[0]]=args[1];
        res.response("谢谢你告诉我~");
        return;
    }
    else
    {
        if (typeof(whoMap[args[0]])!="string")
        {
            res.response("我不知道耶，傻傻分不清~");
            return;
        }
        else
        {
            res.response(args[0]+"就找"+whoMap[args[0]]+"就好啦~酱紫!");
            return;
        }
    }
    res.response("啦啦，我傻了~");
});

var whereMap=new Object;
Ttyann.addGrammer("*在*",function(content,person,res,finder,args)
{
    args[0]=args[0].replace(/你/g,"我");
    args[0]=args[0].replace(/我/g,person.name);
    if (args[1].indexOf("哪里")==-1 && args[1].indexOf("哪")==-1 && args[1].indexOf("什么地方")==-1)
    {
        whereMap[args[0]]=args[1];
        res.response("好的，我知道了！~");
        return;
    }
    else
    {
        if (typeof(whereMap[args[0]])!="string")
        {
            res.response("我不知道耶，傻傻分不清~");
            return;
        }
        else
        {
            res.response(args[0]+"在"+whereMap[args[0]]);
            return;
        }
    }
    res.response("啦啦，我傻了~");
});


Ttyann.addGrammer("*我*电脑坏*",function(content,person,res,finder,args)
{
    res.response("哪一方面的电脑问题呢？T酱虽然笨笨的，但是也会开动酷睿i7的小脑瓜为"+(person.name?person.name:"您")+"解答的!FIGHT!");
});

Ttyann.addGrammer("*我*电脑出问题*",function(content,person,res,finder,args)
{
    res.response("哪一方面的电脑问题呢？T酱虽然笨笨的，但是也会开动酷睿i7的小脑瓜为"+(person.name?person.name:"您")+"解答的!FIGHT!");
}).addGrammer("*我*电脑有问题*",function(content,person,res,finder,args)
{
    res.response("哪一方面的电脑问题呢？T酱虽然笨笨的，但是也会开动酷睿i7的小脑瓜为"+(person.name?person.name:"您")+"解答的!FIGHT!");
});




var howMap=new Object;


Ttyann.addGrammer("*的话*",function(content,person,res,finder,args)
{
    args[0]=args[0].replace(/你/g,"我");
    args[0]=args[0].replace(/我/g,person.name);
    args[0]=args[0].replace(/如果/g,"");
    if (args[1].indexOf("怎么办")==-1 && args[1].indexOf("咋办")==-1 && args[1].indexOf("如何解决")==-1)
    {
        howMap[args[0]]=args[1];
        res.response("谢谢"+(person.name?person.name+"桑":"您")+"教会我这些~么么哒~");
        return;
    }
    else
    {
        if (typeof(howMap[args[0]])!="string")
        {
            res.response("我不知道耶，到底怎么办呢？");
            return;
        }
        else
        {
            res.response(args[0]+"的话"+howMap[args[0]]);
            return;
        }
    }
    res.response("啦啦，我傻了~");
}).addGrammer("*怎么办*",function(content,person,res,finder,args)
{
    args.push("怎么办");
    finder("啊的话比").fn(content,person,res,finder,args);
});


Ttyann.showTree();

        

var robotList=new Object;



var wechat=require("node-wechat")("malJJ");



    
var x=new Ttyann.Ttyann("malpower");
var server=http.createServer(function(req,res)
{ 
    if (req.url=="/")
    {
        res.end(indexPage);
        return;
    }
    if (req.url!="/ask")
    {
        res.end("");
        return;
    }
    x.setDefaultResponser(function(content)
    {
        res.end("DEFAULT");
    });
    var buff=new Buffer(0);
    req.on("data",function(chunk)
    {
        buff=Buffer.concat([buff,chunk]);
    }).on("end",function()
    {
        x.bindOutput(function(content)
        {
            res.writeHead(200,{"content-type": "text/html;charset=utf-8"});
            res.end(content);
        });
        var w=buff.toString("utf8");
        w=qs.parse(w);
        x.tell(w.ask);
    }).on("error",function(err)
    {
        console.log(err);
    });
});

server.listen(8011);
