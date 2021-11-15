
var productsArr=[
{
name:"Vitamin C Serum",
productCategory:"Glow",
MRP:"INR 1095",
Rating:4.3
},
{
name:"Pink Clay Mask",
productCategory:"Glow",
MRP:"INR 845",
Rating:4.7
},
{
name:"Day Cream",
productCategory:"Dry",
MRP:"INR 845",
Rating:4.1
},
{
name:"Night Cream",
productCategory:"Dry", 
MRP:"INR 945",
Rating: 4.7
},
{
name:"Hyaluronic Acid Serum", 
productCategory:"Dry", 
MRP:"INR 975",
Rating: 4.9
},
{
name:"Acne Busting Serum",
productCategory:"Acne", 
MRP:"INR 975",
Rating: 4.6
},
{
name:"Green Clay Mask", 
productCategory:"Acne", 
MRP:"INR 695",
Rating: 4.7
},
{
name:"Day Gel",
productCategory:"Dry", 
MRP:"INR 645",
Rating: 4.9
},
{
name:"AHA Serum",
productCategory:"Glow", 
MRP:"INR 1095",
Rating: 4.5
},
{
name:"AHA Sleep Mask", 
productCategory:"Glow", 
MRP:"INR 995",
Rating: 4.3
},
]

function recommendProduct(productObj){

//two ways to apply logic->
//query from mongo to find the product ---optimised way
//loop through the product array

for(let i of productsArr){
    if(i.name === productObj.name){
        var custCategory=i.productCategory;
    }
}
var custRating=productObj.Rating;
let recommendProductObj;

for(let i of productsArr){
    console.log(i)
//customers rating below 4
if(parseFloat(custRating)<4 && custCategory!=i.productCategory){
    //finding product object with highest rating from different category
    if(!recommendProductObj ||recommendProductObj===undefined|| typeof(recommendProductObj)===undefined|| parseFloat(recommendProductObj.Rating) <parseFloat(i.Rating)){
        recommendProductObj=i
        console.log(recommendProductObj);
    }
    else if(recommendProductObj.Rating===i.Rating && custCategory!=i.productCategory){
        //finding product object with lowest mrp when same rating
        let recommendMRP=parseFloat(recommendProductObj.MRP.split(' ')[1]);
        let prodMRP=parseFloat(i.MRP.split(' ')[1]);

        recommendProductObj=recommendMRP<prodMRP?recommendProductObj:i;
    }
}
//customer rating above 4 or 4.5 --since they will return above 4.3 or 4.5 whichever is higher
    if(parseFloat(custRating)>=4){
        if(!recommendProductObj || typeof(recommendProductObj)===undefined|| recommendProductObj===undefined|| parseFloat(recommendProductObj.Rating)<parseFloat(i.Rating)){
            recommendProductObj=i
            console.log(recommendProductObj)
        }
        else if(recommendProductObj.Rating === i.Rating){
            if(custCategory===i.productCategory && custCategory!=recommendProductObj.productCategory){
                recommendProductObj=i;
            }
            else {
                let recommendMRP=parseFloat(recommendProductObj.MRP.split(' ')[1]);
                let prodMRP=parseFloat(i.MRP.split(' ')[1]);
                recommendProductObj=recommendMRP>prodMRP?recommendProductObj:i;

            }
        }
        
    }



}
return recommendProductObj.name;
}

//customer dummy input
var cutsomerProductObj={
    name:"Day Cream",
    Rating:4.3
}

console.log(recommendProduct(cutsomerProductObj));
