$(function(){
    
    var ex = false, // to check first draw of grid
        table = document.getElementById("pixel_canvas"),
        rowNum,
        colNum,
        stack = [];

    function makeGrid() {
        ex=true;
        for(var i=0;i<rowNum;i++)
        {   
            const row = document.createElement("tr"); // create table row
            row.setAttribute("id" , "tr" + (i+1)); // set id for this row
            for(var j=0;j<colNum;j++)
            {
                 const cellNum = (i) * colNum  + (j+1),
                     col = document.createElement("td"), // create table data
                     text = document.createTextNode(" ");
                 col.setAttribute("id" , cellNum); // set id for this table data
                 col.appendChild(text);
                 row.appendChild(col); // append table data to the row
            }
            table.appendChild(row); //append table row to the table
        } 

    }

    $("#submit").click(function(e){
        e.preventDefault();
        // remove any grid have drawn
        if(ex)
        {    
            for(var i=0;i<rowNum;i++)
            {
                var row = document.getElementById("tr"+(i+1));
                for(var j=0;j<colNum;j++)
                {
                     const cellNum = (i) * colNum  + (j+1);
                     const col = document.getElementById(cellNum);
                     row.removeChild(col);
                }
                table.removeChild(row);
            }
            stack = [];
        }
        // set numbers of rows and number columns
        rowNum = document.getElementById("input_height").value;
        colNum = document.getElementById("input_width").value;
        //call makegrid function
        makeGrid();

        // if clicked on any cell
        for(var j= 1; j<=rowNum*colNum ;j++){
        $("#"+j).click(function(){
            if(!$(this).hasClass("printed")){
                stack.push($(this).attr("id"));
                $(this).addClass("printed");
                var colorval = document.getElementById("colorPicker").value;  
                this.style.backgroundColor= colorval;
            }
        }); 
        }  

    });
    
    // to back the last play
   $("#undo").click(function(e){
        e.preventDefault();
        if(stack.length>0)
        {
            var val = stack[stack.length-1];
            stack.pop();
            $("#"+val).css("background","none");
            $("#"+val).removeClass("printed");
        }
    });
    

    
});




