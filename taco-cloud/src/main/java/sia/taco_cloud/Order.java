package sia.taco_cloud;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.CreditCardNumber;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Pattern;
@Data
public class Order {
    private Long id;
    private Date placeAt;
    private ArrayList<Taco> tacos = new ArrayList<>();

    public void addDesign(Taco design) {
        this.tacos.add(design);
    }

    @NotBlank(message="Delivery name is required")
    private String deliveryName;

    @NotBlank(message="Street is required")
    private String deliveryStreet;

    @NotBlank(message="City is required")
    private String deliveryCity;

    @NotBlank(message="State is required")
    private String deliveryState;

    @NotBlank(message="Zip code is required")
    private String deliveryZip;

    @CreditCardNumber(message="Not a valid credit card number")
    private String ccNumber;

    @Pattern(regexp="^(0[1-9]|1[0-2])([\\/])([1-9][0-9])$",
            message="Must be formatted MM/YY")
    private String ccExpiration;

    @Digits(integer=3, fraction=0, message="Invalid CVV")
    private String ccCVV;
}
