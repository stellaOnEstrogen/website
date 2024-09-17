---
title: 'How I am making the VtubersTV AutoModeration System'
publishedAt: '2024-09-17'
summary: 'A deep dive into the technical intricacies of building an automated moderation system for VtubersTV.'
image: '/assets/images/posts/vtuberstv.jpg'
imageCaption: 'VtubersTV'
---

# Introduction

Building an automated moderation system is no small feat, especially for a platform as dynamic as VtubersTV. This post will walk you through the technical details of how we designed and implemented a robust auto-moderation system using advanced parsing techniques and regular expressions.

**NOTE:** VtubersTV is not released yet, this is a technical deep-dive into the auto-moderation system. Check out the [VtubersTV GitHub](https://github.com/VtubersTV) for more information.

# Tokenization

The first step in our system is tokenization. Tokenization is the process of breaking down a string of text into meaningful components called tokens. This is crucial for understanding and processing the rules defined for moderation.

## Token Types

We defined several token types to capture the different elements of our ruleset. These include types like `VARIABLE`, `IF`, `CONTAINS`, `THEN`, `REPLACE`, `WITH`, `TEXT`, `EQUALS`, `STARTS_WITH`, and `ENDS_WITH`. Each token type represents a specific part of the moderation rules, allowing us to categorize and process them effectively.

## Tokenization Process

The tokenization process involves using a regular expression to match and categorize each part of the input string. This regular expression identifies keywords, operators, and text values, converting them into tokens that our system can understand and manipulate.

### Keywords

Keywords are identified by matching the entire keyword string. For example, `IF` and `THEN` are recognized as keywords.

### Operators

Operators are identified by matching the entire operator string. For example, `CONTAINS`, `STARTS_WITH`, and `ENDS_WITH` are recognized as operators.

### Text Values

Text values are identified by matching any sequence of characters that are not operators or keywords. These values can include text to be replaced, conditions to be evaluated, and other text that needs to be processed.

# Parsing

Once we have our tokens, the next step is parsing them into meaningful rules. The parsing process involves iterating through the tokens and constructing a list of rules that define how the moderation should be applied.

## Parsing Variables

Variables are an essential part of our ruleset. During parsing, we identify variable declarations and store them in a dictionary for later use. This allows us to reference these variables in our rules, making the system more flexible and easier to manage.

## Parsing Rules

Rules are parsed based on their conditions and actions. We support conditions like `CONTAINS`, `STARTS_WITH`, and `ENDS_WITH`. Each condition is translated into a regular expression pattern that can be used to match and replace text in the input.

# Applying Rules

The final step is applying these rules to the input text. This is done by iterating through each rule and applying it to the text using the corresponding regular expression pattern. The result is a moderated version of the input text, with all specified replacements applied.

# Validation

To ensure the ruleset is correctly defined, we implemented a validation mechanism. This checks for common errors and ensures that each rule and variable is correctly formatted. The validation process involves checking the syntax of each line in the ruleset and verifying that it conforms to the expected structure.

# Conclusion

Building the VtubersTV AutoModeration System required a deep understanding of text processing, regular expressions, and robust error handling. By breaking down the problem into tokenization, parsing, rule application, and validation, we were able to create a system that is both powerful and flexible. This ensures that our community remains a safe and welcoming place for all users.

Stay tuned for more updates as we continue to improve and expand the capabilities of our auto-moderation system.