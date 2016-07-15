// Book Store 
// Assignment-02 in javaScript 
// Start time : 13  july 2016 2:42:09PM
// End time :

// All variables
var booksName  = [ "javaScript" , "angular" , "html" , "css" , "jquery" , "python"];
var booksQuantity = [ 15,5,5,5,5,5];
var booksPrice = [ 5,6,5,9,3,5];
var booksSold = [ "angular" ,"css"];
var soldQuantity = [5, 5];
var findName = "";
var buyersName = ["Mr.Ali","Mr.Ahmed","Mr.Raza"];

var buyers= '[{"name":"Mr.Ali","quantity" : "3"},{"name":"Mr.Ahmed","quantity" : "0"},{"name":"Mr.Raza","quantity" : "7"}]';
var json = JSON.parse(buyers);
var result  = json;


// get best buyer from json
function getBestBuyer(arr) 
{
    var max = 0;
    var name ;
    for (var i=0 ; i<arr.length; i++) {
        if (parseInt(arr[i].quantity) >= max)
        {
            max = arr[i].quantity;
            name = arr[i].name;
        }
    }
    return name;
}


// edit json on buying books to figure out best Buyer
function editJson(buyerName,quantityBuy)
{
	for (var i=0; i<buyers.length; i++) {
	  	if (result[i].name == buyerName) 
	  	{
	    	result[i].quantity = Number(result[i].quantity) + quantityBuy;
	    	break;
	  	}
	}
}


// loading dropdown  of buyers and book Names 
//udating saler
function loadDropDown( buyerid,bookNameId)
{
	debugger;
	//dropdawn for buyer's name selection
	$('select').empty();
	$('#bQuantity').val("");
	$('#bQuantityy').val("");
	//$('#buyers').empty();
	for(var i =0 ; i< buyersName.length; i++)
	{
		// creating dropdown option element of select
		option = document.createElement("option");
		option.value = i;
		option.text = buyersName[i];
		buyerid.options.add(option);
	}

	//dropdawn for book name selection
	
	for(var i =0 ; i< booksName.length; i++)
	{
		// creating dropdown option element of select
		option = document.createElement("option");
		option.value = i;
		option.text = booksName[i];
		bookNameId.options.add(option);
	}

	// update best seller
	var name = getBestBuyer(json);
	var link = document.getElementById("TopBuyer");
	$("#TopBuyer").empty();
	link.innerHTML = name;
}

// will work on page load
$(document).ready(function()
{
 	loadDropDown( document.getElementById("buyers"),document.getElementById("bookName"));
});

// Adding Book Name , No of Books and Price of Books in book Store
function AddBookInStore()
{
	debugger;
	var name = (document.getElementById("bName").value).toLowerCase();
	var quantity = Number(document.getElementById("bQuantityy").value);
	var price = Number(document.getElementById("bPrice").value);

	if(quantity <= 0 || price <= 0 || name =="")
	{
		return;
	}

	if(booksName.indexOf(name) > -1)
	{
		findName = name;
		var indexOfName = booksName.findIndex(checkIndex);
		booksQuantity[indexOfName] = booksQuantity[indexOfName] + quantity;
	}
	else{
		booksName.push(name);
		booksQuantity.push(quantity);
		booksPrice.push(price);
	}
	loadDropDown( document.getElementById("buyers"),document.getElementById("bookName"));

	document.getElementById("bName").value = null;
	document.getElementById("bQuantity").innerHTML = "";
	document.getElementById("bPrice").value = null;
	alert("Successfully Done");
}

//function use as perameter for FindIndex() function
function checkIndex(name)
{
	return  name == findName;
}


// avoid reload of page after submition of add book form
$('#AddBookForm').submit(function () {
	 return false;
});

// avoid reload of page after submition of buy book form
$('#buyBooksForm').submit(function () {
	 return false;
});

// avoid reload of page after submition of search form
$('#submitsearchForm').submit(function () {
	 return false;
});


// dealing  buy Books 
function submitOrder(bookName,bquantity,bbuyer)
{

	var index = bookName.value;
	var name = booksName[index];

	//using to find index name in SoldBook Array
	// findName is gloa=ble variable
	findName = name;
	var quantity = Number(bquantity.value); 
	
	if(quantity <= 0)
	{
		return;
	}

	//not enough Stock for buying
	if ((booksQuantity[index] - quantity)  < 0)
	{
		//no push will perform
		alert("Not Enought Stoke is Availabe :(  Available Quantity is : " + booksQuantity[index]);
		return;
	}
	else
	{
		//books Sold Array is empty
		if(booksSold.length > 0)
		{
			// already contain .this name in books Sold array
			if(booksSold.indexOf(name)> -1)
			{
				var indexOfElement = booksSold.findIndex(checkIndex);

				if((booksQuantity[index] - quantity) > 0)
				{
					booksQuantity[index] = booksQuantity[index] - quantity;
					soldQuantity[indexOfElement] = soldQuantity[indexOfElement] + quantity;
				}
				else if((booksQuantity[index] - quantity) == 0)
				{

					// remove name and quantity from BooksName Array and booksQuantity Array
					booksName.splice(index, 1);
					booksQuantity.splice(index, 1);

					soldQuantity[indexOfElement] = soldQuantity[indexOfElement] + quantity;
						
				}
				//update json for buyer 
				editJson(buyersName[bbuyer.value], Number(quantity));
			}
			else
			{
				if((booksQuantity[index] - quantity) > 0)
				{
					booksQuantity[index] = booksQuantity[index] - quantity;
				}
				else if((booksQuantity[index] - quantity) == 0)
				{

					// remove name and quantity from BooksName Array and booksQuantity Array
					booksName.splice(index, 1);
					booksQuantity.splice(index, 1);
						
				}
				booksSold.push(name);
				soldQuantity.push(quantity);

				//update json for buyer 
				editJson(buyersName[bbuyer.value], Number(quantity));
			}
		}
		else
		{
			if((booksQuantity[index] - quantity) > 0)
			{
				booksQuantity[index] = booksQuantity[index] - quantity;

			}
			else if((booksQuantity[index] - quantity) == 0)
			{
				// remove name and quantity from BooksName Array and booksQuantity Array
				booksName.splice(index, 1);
				booksQuantity.splice(index, 1);
						
			}

			booksSold.push(name);
			soldQuantity.push(quantity);

			//update json for buyer 
			editJson(buyersName[bbuyer.value], Number(quantity));

		}	
	}
	//reload drop drop down
	loadDropDown( document.getElementById("buyers"),document.getElementById("bookName"));

	alert("Successfully Done");
}


// displaying all book on web
function ViewAllBooks()
{

	var counter = 0;

	var div = document.getElementById("showAllBooks");
	var htmlElements = "";
	var finalstring = "";
	
	for(var i = 0 ; i<booksName.length/4; i++)
	{
		for(var j = 0; j< 4 ; j++)
		{
			if(booksName[counter] == undefined) 
			{
				break;
			}
			else
			{	
				//creating div for image / price / buy Button
				htmlElements = "<div class='col-md-3' style='margin-top:15px;'><div class='row'><img src='../image/1.jpg' height='270px' width='85%' alt='image not found'/></div><div class='row'><p style='font-weight: bold; font-size: 15px;'>"+booksName[counter]+"</p> <p><span style='font-weight: bold; font-size: 13px'>Price:</span>"+booksPrice[counter]+" .$</p></div> <div class='row'><input class='btn  btn-info' type='button' data-toggle='modal' data-target='#myModal' value='Buy' ></input></div></div>";
				finalstring = finalstring + htmlElements;
				counter++;
			}	
		}	
	}

	div.innerHTML = finalstring;

}

//perform search and also displaying results
function search(bookName)
{			
	
	bookName = bookName.toLowerCase();

	var counter = 0;
	var flage = true;

	var div = document.getElementById("showResults");
	var htmlElements = "";
	var finalstring = "";


		for(var i = 0 ; i<booksName.length; i++)
		{
			if(booksName[counter] == undefined) 
			{
				break;
			}
			else if(booksName[counter].includes(bookName))
			{		
				htmlElements = "<div class='col-md-3' style='margin-top:15px;'><div class='row'><img src='../image/1.jpg' height='270px' width='85%' alt='image not found'/></div><div class='row'><p style='font-weight: bold; font-size: 15px;'>"+booksName[counter]+"</p> <p><span style='font-weight: bold; font-size: 13px'>Price:</span>"+booksPrice[counter]+" .$</p></div> <div class='row'><input class='btn  btn-info' type='button' data-toggle='modal' data-target='#myModal' value='Buy'></input></div></div>";
				finalstring = finalstring + htmlElements;
				flage = false;
			}	
			counter++;	
		}

		div.innerHTML = finalstring;

	if (flage)
	{
		alert("No Match found");
	}

}


