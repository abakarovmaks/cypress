Feature: End to end Ecommerce validation

    application Regression

    @Regression
    Scenario: Ecommerce products delivery
        Given I open ecommerce page
        When I add items to cart
        And Validate the total prices
        Then Select the country, submit and verify Thankyou message

    @Smoke
    Scenario: Filling the form to shop
        Given I open ecommerce page
        When I fell the form details
            | name | gender |
            | bobz | Male   |
        Then Validate the form behaviour
        And Select the shop page