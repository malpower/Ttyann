function PersonList()
{
    var list=new Object;
    this.addPerson=function(who)
    {
        if (list[who]!=undefined)
        {
            return list[who];
        }
        list[who]=new Object;
        return list[who];
    };
    this.findPerson=function(who)
    {
        return list[who];
    };
}



var plist=new PersonList;

plist.addPerson("malpwoer");


module.exports=plist;