package com.haui.onlinestore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.haui.onlinestore.domain.enumeration.InvoiceStatus;
import com.haui.onlinestore.domain.enumeration.PaymentMethod;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Invoice.
 */
@Document(collection = "invoice")
public class Invoice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("date")
    private Instant date;

    @Field("details")
    private String details;

    @NotNull
    @Field("status")
    private InvoiceStatus status;

    @NotNull
    @Field("payment_method")
    private PaymentMethod paymentMethod;

    @NotNull
    @Field("payment_date")
    private Instant paymentDate;

    @NotNull
    @Field("payment_amount")
    private BigDecimal paymentAmount;

    @DBRef
    @Field("shipment")
    @JsonIgnoreProperties(value = { "invoice" }, allowSetters = true)
    private Set<Shipment> shipments = new HashSet<>();

    @DBRef
    @Field("order")
    @JsonIgnoreProperties(value = { "orderItems", "invoices", "customer" }, allowSetters = true)
    private ProductOrder order;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Invoice id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getDate() {
        return this.date;
    }

    public Invoice date(Instant date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getDetails() {
        return this.details;
    }

    public Invoice details(String details) {
        this.setDetails(details);
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public InvoiceStatus getStatus() {
        return this.status;
    }

    public Invoice status(InvoiceStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(InvoiceStatus status) {
        this.status = status;
    }

    public PaymentMethod getPaymentMethod() {
        return this.paymentMethod;
    }

    public Invoice paymentMethod(PaymentMethod paymentMethod) {
        this.setPaymentMethod(paymentMethod);
        return this;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Instant getPaymentDate() {
        return this.paymentDate;
    }

    public Invoice paymentDate(Instant paymentDate) {
        this.setPaymentDate(paymentDate);
        return this;
    }

    public void setPaymentDate(Instant paymentDate) {
        this.paymentDate = paymentDate;
    }

    public BigDecimal getPaymentAmount() {
        return this.paymentAmount;
    }

    public Invoice paymentAmount(BigDecimal paymentAmount) {
        this.setPaymentAmount(paymentAmount);
        return this;
    }

    public void setPaymentAmount(BigDecimal paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public Set<Shipment> getShipments() {
        return this.shipments;
    }

    public void setShipments(Set<Shipment> shipments) {
        if (this.shipments != null) {
            this.shipments.forEach(i -> i.setInvoice(null));
        }
        if (shipments != null) {
            shipments.forEach(i -> i.setInvoice(this));
        }
        this.shipments = shipments;
    }

    public Invoice shipments(Set<Shipment> shipments) {
        this.setShipments(shipments);
        return this;
    }

    public Invoice addShipment(Shipment shipment) {
        this.shipments.add(shipment);
        shipment.setInvoice(this);
        return this;
    }

    public Invoice removeShipment(Shipment shipment) {
        this.shipments.remove(shipment);
        shipment.setInvoice(null);
        return this;
    }

    public ProductOrder getOrder() {
        return this.order;
    }

    public void setOrder(ProductOrder productOrder) {
        this.order = productOrder;
    }

    public Invoice order(ProductOrder productOrder) {
        this.setOrder(productOrder);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Invoice)) {
            return false;
        }
        return id != null && id.equals(((Invoice) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Invoice{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", details='" + getDetails() + "'" +
            ", status='" + getStatus() + "'" +
            ", paymentMethod='" + getPaymentMethod() + "'" +
            ", paymentDate='" + getPaymentDate() + "'" +
            ", paymentAmount=" + getPaymentAmount() +
            "}";
    }
}
