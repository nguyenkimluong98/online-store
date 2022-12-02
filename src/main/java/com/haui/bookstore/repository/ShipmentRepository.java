package com.haui.bookstore.repository;

import com.haui.bookstore.domain.Shipment;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Shipment entity.
 */
@Repository
public interface ShipmentRepository extends MongoRepository<Shipment, String> {
    @Query("{}")
    Page<Shipment> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Shipment> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Shipment> findOneWithEagerRelationships(String id);
}
