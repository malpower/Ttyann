var my=require("mysql");
var gTree=require("./gTree");
var personList=require("./persons");





function FindResponser(content,node,index,stamp,stack,elem)
{
    node=node || gTree.tree;
    index=index || 0;
    stack=stack || (new Array);
    stack=JSON.parse(JSON.stringify(stack));
    var rlt;
    console.log(node);
    console.log("~~~~~~"+content[index]);
    if (index==content.length)
    {
        if (typeof(node.responser)!="function")
        {
            if (!(node["*"]!=undefined && node["*"].responser!=undefined))
            {
                return {found: false};
            }
            node=node["*"];
        }
        console.log(stack+"|||||"+elem);
        if (elem!=undefined)
        {
            stack.push(elem);
            console.log(stack+"|||||"+elem);
        }
        return {found: true,fn: node.responser,stack: stack};
    }
    for (var x in node)
    {
        if (x==content[index])
        {
            rlt=FindResponser(content,node[x],index+1,x,stack);
            if (rlt.found==true)
            {
                return rlt;
            }
        }
    }
    if (node["?"]!=undefined)
    {
        stack.push(content[index]);
        rlt=FindResponser(content,node["?"],index+1,"?",stack);
        if (rlt.found==true)
        {
            return rlt;
        }
    }
    if (stamp=="*")
    {
        elem+=content[index];
        if (node[content[index+1]]!=undefined)
        {
            stack.push(elem);
            elem=undefined;
        }
        rlt=FindResponser(content,node,index+1,"*",stack,elem);
        if (rlt.found==true)
        {
            return rlt;
        }
    }
    if (node["*"]!=undefined)
    {
        console.log("HERERERERERERER");
        elem=new String;
        elem+=content[index];
        rlt=FindResponser(content,node["*"],index+1,"*",stack,elem);
        if (rlt.found==true)
        {
            return rlt;
        }
    }
    return {found: false};
}


    
    
    
    
function LT(who)
{
    var res=new Object,DefaultResponser;
    res.response=function(content)
    {
        console.log(content);
    };
    var person=personList.addPerson(who);
    this.target=who;
    this.tell=function(content)
    {
        console.log("=======================");
        if (typeof(res.context)=="function")
        {
            return res.context(content,person,res,FindResponser);
        }
        var rlt=FindResponser(content);
        if (!rlt.found)
        {
            return DefaultResponser(content,person,res,FindResponser);
        }
        console.log(rlt);
        return rlt.fn(content,person,res,FindResponser,rlt.stack);
    };
    this.bindOutput=function(fn)
    {
        res.response=fn;
    };
    this.setDefaultResponser=function(fn)
    {
        DefaultResponser=fn;
    };
}


module.exports={Ttyann: LT,addGrammer: function(sentence,fn)
{
    var args=new Array;
    for (var i=0;i<sentence.length;i++)
    {
        args.push(sentence[i]);
    }
    args.push(fn);
    gTree.addGrammer.apply(this,args);
},showTree: function()
{
    console.log(gTree.tree);
}};










