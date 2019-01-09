import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Hash {
    public String getHash(String value) {
        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return "";
        }
        byte[] encodedHash = digest.digest(
                value.getBytes(StandardCharsets.UTF_8));

        StringBuffer hexString = new StringBuffer();
        for (byte anEncodedHash : encodedHash) {
            String hex = Integer.toHexString(0xff & anEncodedHash);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }

        return hexString.toString();
    }
}
