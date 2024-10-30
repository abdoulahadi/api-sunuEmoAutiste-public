public class Jeu4Match {
    private String gameID; // Reference to Game ID
    private String mainImageID; // Reference to Main Image ID
    private String option1ImageID; // Reference to Option 1 Image ID
    private String option2ImageID; // Reference to Option 2 Image ID
    private String niveau; // "Facile", "Moyen", or "Difficile"
    private int correctOptionPosition; // 1, 2, or 3
    private String id;

    public Jeu4Match(String gameID, String mainImageID, String option1ImageID, String option2ImageID, String niveau, int correctOptionPosition) {
        this.gameID = gameID;
        this.mainImageID = mainImageID;
        this.option1ImageID = option1ImageID;
        this.option2ImageID = option2ImageID;
        this.niveau = niveau;
        this.correctOptionPosition = correctOptionPosition;
    }

    // Getters and Setters
    public String getGameID() {
        return gameID;
    }

    public void setGameID(String gameID) {
        this.gameID = gameID;
    }

    public String getMainImageID() {
        return mainImageID;
    }

    public void setMainImageID(String mainImageID) {
        this.mainImageID = mainImageID;
    }

    public String getOption1ImageID() {
        return option1ImageID;
    }

    public void setOption1ImageID(String option1ImageID) {
        this.option1ImageID = option1ImageID;
    }

    public String getOption2ImageID() {
        return option2ImageID;
    }

    public void setOption2ImageID(String option2ImageID) {
        this.option2ImageID = option2ImageID;
    }

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public int getCorrectOptionPosition() {
        return correctOptionPosition;
    }

    public void setCorrectOptionPosition(int correctOptionPosition) {
        this.correctOptionPosition = correctOptionPosition;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Equivalent toJSON method
    public String toJSON() {
        return "{\"gameID\": \"" + gameID + "\", \"mainImageID\": \"" + mainImageID + 
               "\", \"option1ImageID\": \"" + option1ImageID + "\", \"option2ImageID\": \"" + option2ImageID + 
               "\", \"niveau\": \"" + niveau + "\", \"correctOptionPosition\": " + correctOptionPosition + 
               ", \"id\": \"" + id + "\"}";
    }
}
