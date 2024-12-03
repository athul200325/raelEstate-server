import lisling from '../models/listingModel.js'

export const addListController= async(req,res)=>{
    console.log("inside addListController");

    const userId=req.userId
    console.log(userId);
    const {name,desc,address,sell,rent,parking,furnished,offer,bedrooms,bathrooms,price,dprice,conatctNumber}=req.body;
    const houseImage=req.file.filename

    console.log(name,desc,address,sell,rent,parking,furnished,offer,bedrooms,bathrooms,price,dprice,houseImage,conatctNumber);

    try{
        const existingList=await lisling.findOne({address})
        if(existingList){
            return res.status(406).json("List already exists for this address")
        }else{
            const newList=new lisling({name,desc,address,sell,rent,parking,furnished,offer,bedrooms,bathrooms,price,dprice,houseImage,conatctNumber,userId})
            await newList.save()
            res.status(201).json("List added successfully")
            
        }
    }catch(err){
        console.log("Error while adding list",err);
        res.status(401).json("Error while adding list")
    }
    

    
    
    
}

export const getAllListsController=async(req,res)=>{
    console.log("inside getAllListsController");
    try{
        const allLists=await lisling.find()
        res.status(200).json(allLists)
    }catch(err){
        console.log("Error while getting lists",err);
        res.status(401).json("Error while getting lists")
    }
}

export const getUserListsController = async (req, res) => {
    try {
      console.log("Inside getUserListsController");
      const userId = req.userId;
      console.log("User ID:", userId);
  
      if (!userId) {
        return res.status(400).json({ error: "User ID not found in request" });
      }
  
      // Wrap the database query in a timeout
      const allUserLists = await Promise.race([
        lisling.find({ userId }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Query timeout")), 5000)),
      ]);
  
      console.log("User Listings:", allUserLists);
      res.status(200).json(allUserLists);
    } catch (err) {
      console.error("Error in getUserListsController:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

export const updateListController=async(req,res)=>{
    console.log("inside updateListController");
    const id=req.params.id
    const userId=req.userId
    console.log(id,userId);
    const {name,desc,address,sell,rent,parking,furnished,offer,bedrooms,bathrooms,price,dprice,houseImage,conatctNumber}=req.body;
    const reUplodHouseImg=req.file?req.file.filename:houseImage;

    try{
        const updateList=await lisling.findByIdAndUpdate({_id:id},{
            name,desc,address,sell,rent,parking,furnished,offer,bedrooms,bathrooms,price,dprice,houseImage:reUplodHouseImg,conatctNumber,userId
        },{new:true})
        await updateList.save()
        res.status(200).json(updateList)
    }catch(err){
        res.status(401).json(err)
    }
}

export const deleteListController = async (req, res) => {
    console.log("inside removeProjectController");
    const { id } = req.params;
    try {
        const deleteList = await lisling.findByIdAndDelete(id); // Use findByIdAndDelete for deletion
        if (!deleteList) {
            return res.status(404).json({ message: "Listing not found" });
        }
        res.status(200).json({ message: "Listing deleted successfully", deleteList });
    } catch (err) {
        console.error("Error in deleting listing:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getSingleListController = async (req, res) => {
  console.log("Inside getSingleListController");

  const { id } = req.params;  // Extract the listing ID from the request parameters

  try {
    const list = await lisling.findById(id);  // Fetch the listing by its ID

    if (!list) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Send the found listing back to the client
    res.status(200).json(list);
  } catch (err) {
    console.error("Error in getSingleListController:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
