var gtree=new Object;
function AddGrammer()
{
    var pointer=gtree;
    var args=arguments;
    var fn=args[args.length-1];
    for (var i=0;i<args.length-1;i++)
    {
        if (typeof(pointer[args[i]])=="undefined")
        {
            pointer[args[i]]=new Object;
        }
        pointer=pointer[args[i]];
    }
    pointer.responser=fn;
}




module.exports={tree: gtree,addGrammer: AddGrammer};




