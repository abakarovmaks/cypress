Feature: End to end Ecommerce validation

    application Regression

    @Regression
    Scenario: Ecommerce products delivery
        Given Open ecommerce page
        When Add items to cart
        Then Validate the total prices
        Then Select the country, submit and verify Thankyou message

    @Smoke
    Scenario: Filling the form to shop
        Given Open ecommerce page
        When Fell the form details
            | name | gender |
            | bobz | Male   |
        Then Validate the form behaviour
        Then Select the shop page