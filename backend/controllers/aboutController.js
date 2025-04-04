import About from "../models/About.js";

export const updateAboutPage = async (req, res) => {
    try {
        const { mission, vision, team } = req.body;
        // const aboutData = await About.findOneAndUpdate({}, { mission, vision, team }, { upsert: true, new: true });
        // res.json({ message: "About page updated!", data: aboutData });

        if (!mission || !vision || !team) {
            return res.status(400).json({ error: "Missing required fields" });
          }
      
          let about = await About.findOne();
          if (!about) {
            // return res.status(404).json({ error: "About section not found" });
            about = new About({ mission, vision, team });
          }
          else{
              about.mission = mission;
              about.vision = vision;
              about.team = team;
          }
          
          await about.save();
      
          res.status(200).json({ message: "About section updated successfully", about });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const deleteAboutPage = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from URL

        // Check if the document exists
        const about = await About.findById(id);
        if (!about) {
            return res.status(404).json({ error: "About section not found" });
        }

        // Delete the document
        await About.findByIdAndDelete(id);

        res.status(200).json({ message: "About section deleted successfully" });
    } catch (error) {
        console.error("Error deleting about section:", error);
        res.status(500).json({ error: "Server error" });
    }
};

