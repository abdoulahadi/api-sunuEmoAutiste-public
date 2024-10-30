public class Jeu2Pairs {
    private String gameID; // Reference to Game ID
    private String image1ID; // Reference to Image 1 ID
    private String image2ID; // Reference to Image 2 ID
    private String niveau; // "Facile", "Moyen", or "Difficile"
    private String id;

    public Jeu2Pairs(String gameID, String image1ID, String image2ID, String niveau) {
        this.gameID = gameID;
        this.image1ID = image1ID;
        this.image2ID = image2ID;
        this.niveau = niveau;
    }

    // Getters and Setters
    public String getGameID() {
        return gameID;
    }

    public void setGameID(String gameID) {
        this.gameID = gameID;
    }

    public String getImage1ID() {
        return image1ID;
    }

    public void setImage1ID(String image1ID) {
        this.image1ID = image1ID;
    }

    public String getImage2ID() {
        return image2ID;
    }

    public void setImage2ID(String image2ID) {
        this.image2ID = image2ID;
    }

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Equivalent toJSON method
    public String toJSON() {
        return "{\"gameID\": \"" + gameID + "\", \"image1ID\": \"" + image1ID + 
               "\", \"image2ID\": \"" + image2ID + "\", \"niveau\": \"" + niveau + 
               "\", \"id\": \"" + id + "\"}";
    }
}
