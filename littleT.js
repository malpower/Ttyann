var my=require("mysql");
var gTree=require("./gTree");
var personList=require("./persons");





function FindResponser(content,node,index,stamp,stack,elem)
{
    node=node || gTree.tree;
    index=index || 0;
    stack=stack || (new Array);
    var originStack=stack;
    stack=JSON.parse(JSON.stringify(stack));
    var rlt;
    if (index>=content.length)
    {
        if (typeof(node.responser)!="function")
        {
            if (!(node["*"]!=undefined && node["*"].responser!=undefined))
            {
                return {found: false,stack: stack};
            }
            node=node["*"];
        }
        if (elem!=undefined)
        {
            stack.push(elem);
        }
        return {found: true,fn: node.responser,stack: stack};
    }
    var put=false;
    for (var x in node)
    {
        if (x==content[index])
        {
            if (node[content[index]]!=undefined && elem)
            {
                put=true;
                stack.push(elem);
                elem=undefined;
            }
            rlt=FindResponser(content,node[x],index+1,x,stack);
            if (rlt.found==true)
            {
                return rlt;
            }
        }
    }
    try
    {
        if (put)
        {
            elem=stack.pop();
        }
    }
    catch (e)
    {
        //
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
        if (!elem)
        {
            elem=new String;
        }
        elem+=content[index];
        rlt=FindResponser(content,node,index+1,"*",stack,elem);
        if (rlt.found==true)
        {
            return rlt;
        }
        
    }
    if (node["*"]!=undefined)
    {
        elem=new String;
        elem+=content[index];
        rlt=FindResponser(content,node["*"],index+1,"*",stack,elem);
        if (rlt.found==true)
        {
            return rlt;
        }
    }
    return {found: false,stack: stack};
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
        if (typeof(res.context)=="function")
        {
            return res.context(content,person,res,FindResponser);
        }
        var rlt=FindResponser(content);
        if (!rlt.found)
        {
            return DefaultResponser(content,person,res,FindResponser);
        }
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
    return this;
},showTree: function()
{
    console.log(gTree.tree);
}};










