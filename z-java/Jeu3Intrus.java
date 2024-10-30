public class Jeu3Intrus {
    private String gameID; // Reference to Game ID
    private String image1ID; // Reference to Image 1 ID
    private String image2ID; // Reference to Image 2 ID
    private String image3ID; // Reference to Image 3 ID
    private String niveau; // "Facile", "Moyen", or "Difficile"
    private int correctIntrusPosition; // 1, 2, or 3
    private String id;

    public Jeu3Intrus(String gameID, String image1ID, String image2ID, String image3ID, String niveau, int correctIntrusPosition) {
        this.gameID = gameID;
        this.image1ID = image1ID;
        this.image2ID = image2ID;
        this.image3ID = image3ID;
        this.niveau = niveau;
        this.correctIntrusPosition = correctIntrusPosition;
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

    public String getImage3ID() {
        return image3ID;
    }

    public void setImage3ID(String image3ID) {
        this.image3ID = image3ID;
    }

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public int getCorrectIntrusPosition() {
        return correctIntrusPosition;
    }

    public void setCorrectIntrusPosition(int correctIntrusPosition) {
        this.correctIntrusPosition = correctIntrusPosition;
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
               "\", \"image2ID\": \"" + image2ID + "\", \"image3ID\": \"" + image3ID + 
               "\", \"niveau\": \"" + niveau + "\", \"correctIntrusPosition\": " + correctIntrusPosition + 
               ", \"id\": \"" + id + "\"}";
    }
}
