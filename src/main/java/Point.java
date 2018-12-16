import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement
@Getter @Setter
@Entity
@Table(name = "points")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    private double x;

    @Column
    private double y;

    @Column
    private double r;

    @Column(name = "result")
    private boolean inArea;

    @JsonIgnore // doesn't work
    @XmlTransient
    @OneToOne()
    @JoinColumn(name = "user_id")
    private User user;

    public Point() {}

    public Point(double x, double y, double r, boolean inArea, User user) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.inArea = inArea;
        this.user = user;
    }
}

