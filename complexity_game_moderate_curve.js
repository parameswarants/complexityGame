/*
    THE COMPLEXITY GAME
    -------------------
    Plain JavaScript. No libraries or frameworks.

    Game model:
    - R1-R6 build the system.
    - R7 is selected from the system state at the end of R6.
    - R8 is selected from the system state after R7.
    - Value, Agility and Complexity are the only game state variables.
    - History is used sparingly to remember what happened, not as a score.
*/

const rounds = [

    // --------------------------------------------------
    // R1 - THE EXCEPTION
    // --------------------------------------------------

    {
        title: "The Exception",
        situation: "A large customer asks for a custom feature that is not part of the standard offering.",
        decisions: [
            {
                text: "Build the custom feature",
                consequences: [
                    { variable: "value", change: 10 },
                    { variable: "agility", change: -4 },
                    { variable: "complexity", change: 8 }
                ],
                history: "exception"
            },
            {
                text: "Build a standardized version",
                consequences: [
                    { variable: "value", change: 6 },
                    { variable: "agility", change: -1 },
                    { variable: "complexity", change: 3 }
                ],
                history: "standardize"
            },
            {
                text: "Reject the request",
                consequences: [
                    { variable: "value", change: -4 },
                    { variable: "agility", change: 3 },
                    { variable: "complexity", change: -4 }
                ],
                history: "holdStandard"
            }
        ]
    },

    // --------------------------------------------------
    // R2 - THE PRECEDENT
    // --------------------------------------------------

    {
        title: "The Precedent",
        situation: "Another important customer has a similar need. Sales points to how the earlier request was handled.",
        decisions: [
            {
                text: "Make another exception",
                consequences: [
                    { variable: "value", change: 8 },
                    { variable: "agility", change: -5 },
                    { variable: "complexity", change: 9 }
                ],
                history: "exception"
            },
            {
                text: "Turn the need into a standard capability",
                consequences: [
                    { variable: "value", change: 6 },
                    { variable: "agility", change: -2 },
                    { variable: "complexity", change: 4 }
                ],
                history: "standardize"
            },
            {
                text: "Hold the standard",
                consequences: [
                    { variable: "value", change: -3 },
                    { variable: "agility", change: 3 },
                    { variable: "complexity", change: -3 }
                ],
                history: "holdStandard"
            }
        ]
    },

    // --------------------------------------------------
    // R3 - THE VARIATION
    // --------------------------------------------------

    {
        title: "The Variation",
        situation: "As more customers and teams use the capabilities, different groups are adapting them in different ways. There is no longer one consistent way of handling the need.",
        decisions: [
            {
                text: "Support the variations",
                consequences: [
                    { variable: "value", change: 7 },
                    { variable: "agility", change: -4 },
                    { variable: "complexity", change: 7 }
                ],
                history: "variation"
            },
            {
                text: "Consolidate around a common model",
                consequences: [
                    { variable: "value", change: 3 },
                    { variable: "agility", change: 4 },
                    { variable: "complexity", change: -7 }
                ],
                history: "consolidate"
            },
            {
                text: "Let teams manage locally",
                consequences: [
                    { variable: "value", change: 5 },
                    { variable: "agility", change: 2 },
                    { variable: "complexity", change: 4 }
                ],
                history: "local"
            }
        ]
    },

    // --------------------------------------------------
    // R4 - THE GOVERNANCE QUESTION
    // --------------------------------------------------

    {
        title: "The Governance Question",
        situation: "Leadership sees teams making different trade-offs and wants clearer rules for how such decisions should be made.",
        decisions: [
            {
                text: "Centralize decisions",
                consequences: [
                    { variable: "value", change: 4 },
                    { variable: "agility", change: -3 },
                    { variable: "complexity", change: 6 }
                ],
                history: "centralize"
            },
            {
                text: "Simplify the rules",
                consequences: [
                    { variable: "value", change: 3 },
                    { variable: "agility", change: 5 },
                    { variable: "complexity", change: -6 }
                ],
                history: "simplify"
            },
            {
                text: "Push decisions to teams",
                consequences: [
                    { variable: "value", change: 5 },
                    { variable: "agility", change: 4 },
                    { variable: "complexity", change: 4 }
                ],
                history: "local"
            }
        ]
    },

    // --------------------------------------------------
    // R5 - THE TRADE-OFF BECOMES VISIBLE
    // --------------------------------------------------

    {
        title: "The Trade-off Becomes Visible",
        situation: "The organization reviews how it operates and realizes that individually sensible decisions have costs when viewed together. Leadership asks where to intervene.",
        decisions: [
            {
                text: "Preserve what we have",
                consequences: [
                    { variable: "value", change: 6 },
                    { variable: "agility", change: -3 },
                    { variable: "complexity", change: 7 }
                ],
                history: "preserve"
            },
            {
                text: "Consolidate aggressively",
                consequences: [
                    { variable: "value", change: 1 },
                    { variable: "agility", change: 5 },
                    { variable: "complexity", change: -9 }
                ],
                history: "consolidate"
            },
            {
                text: "Redesign selectively",
                consequences: [
                    { variable: "value", change: 5 },
                    { variable: "agility", change: 2 },
                    { variable: "complexity", change: -4 }
                ],
                history: "selective"
            }
        ]
    },

    // --------------------------------------------------
    // R6 - THE WORKAROUND
    // --------------------------------------------------

    {
        title: "The Workaround",
        situation: "Teams have developed informal shortcuts because the formal system is becoming harder to navigate.",
        decisions: [
            {
                text: "Allow shortcuts",
                consequences: [
                    { variable: "value", change: 5 },
                    { variable: "agility", change: 3 },
                    { variable: "complexity", change: 7 }
                ],
                history: "workaround"
            },
            {
                text: "Eliminate shortcuts",
                consequences: [
                    { variable: "value", change: -2 },
                    { variable: "agility", change: -1 },
                    { variable: "complexity", change: -6 }
                ],
                history: "standardize"
            },
            {
                text: "Formalize useful shortcuts",
                consequences: [
                    { variable: "value", change: 4 },
                    { variable: "agility", change: 2 },
                    { variable: "complexity", change: 2 }
                ],
                history: "formalize"
            }
        ]
    }
];


// --------------------------------------------------
// DYNAMIC R7 SCENARIOS
// --------------------------------------------------

const r7Scenarios = {

    strained: {
        title: "The Shock: The System Is Already Under Pressure",
        situation: "A major market change requires a rapid response. The organization knows what needs to change, but the existing system is difficult to modify quickly.",
        decisions: [
            {
                text: "Push the change through the existing system",
                consequences: [
                    { variable: "value", change: 5 },
                    { variable: "agility", change: -7 },
                    { variable: "complexity", change: 7 }
                ]
            },
            {
                text: "Simplify before responding",
                consequences: [
                    { variable: "value", change: -2 },
                    { variable: "agility", change: 6 },
                    { variable: "complexity", change: -10 }
                ]
            },
            {
                text: "Create a temporary workaround",
                consequences: [
                    { variable: "value", change: 4 },
                    { variable: "agility", change: 1 },
                    { variable: "complexity", change: 8 }
                ]
            }
        ]
    },

    complex: {
        title: "The Shock: Everyone Has a Solution",
        situation: "The organization needs to respond quickly. Several existing capabilities could help, but they work differently and require coordination.",
        decisions: [
            {
                text: "Coordinate existing capabilities",
                consequences: [
                    { variable: "value", change: 7 },
                    { variable: "agility", change: -4 },
                    { variable: "complexity", change: 5 }
                ]
            },
            {
                text: "Create one simplified response",
                consequences: [
                    { variable: "value", change: 2 },
                    { variable: "agility", change: 5 },
                    { variable: "complexity", change: -8 }
                ]
            },
            {
                text: "Let teams respond independently",
                consequences: [
                    { variable: "value", change: 5 },
                    { variable: "agility", change: 1 },
                    { variable: "complexity", change: 6 }
                ]
            }
        ]
    },

    adaptive: {
        title: "The Shock: An Opportunity Appears",
        situation: "The market changes unexpectedly. This time, the change creates an opportunity. The organization has enough flexibility to respond quickly.",
        decisions: [
            {
                text: "Move quickly using existing capabilities",
                consequences: [
                    { variable: "value", change: 9 },
                    { variable: "agility", change: -4 },
                    { variable: "complexity", change: 5 }
                ]
            },
            {
                text: "Reassess before committing",
                consequences: [
                    { variable: "value", change: 4 },
                    { variable: "agility", change: 3 },
                    { variable: "complexity", change: -3 }
                ]
            },
            {
                text: "Let teams experiment independently",
                consequences: [
                    { variable: "value", change: 7 },
                    { variable: "agility", change: 1 },
                    { variable: "complexity", change: 4 }
                ]
            }
        ]
    },

    constrained: {
        title: "The Shock: The Trade-off Becomes Real",
        situation: "The market change creates competing pressures. Responding quickly could increase complexity. Simplifying could delay the response.",
        decisions: [
            {
                text: "Prioritize the response",
                consequences: [
                    { variable: "value", change: 8 },
                    { variable: "agility", change: -5 },
                    { variable: "complexity", change: 6 }
                ]
            },
            {
                text: "Simplify first",
                consequences: [
                    { variable: "value", change: 2 },
                    { variable: "agility", change: 5 },
                    { variable: "complexity", change: -7 }
                ]
            },
            {
                text: "Balance both",
                consequences: [
                    { variable: "value", change: 5 },
                    { variable: "agility", change: 1 },
                    { variable: "complexity", change: -2 }
                ]
            }
        ]
    }
};


// --------------------------------------------------
// DYNAMIC R8 SCENARIOS
// --------------------------------------------------

const r8Scenarios = {

    fragileSuccess: {
        title: "The Reckoning: Do We Keep What Works?",
        situation: "The crisis has passed. The system delivers strong business value, but recent events have exposed how difficult it has become to change.",
        decisions: [
            {
                text: "Continue investing",
                consequences: [
                    { variable: "value", change: 7 },
                    { variable: "agility", change: -4 },
                    { variable: "complexity", change: 6 }
                ]
            },
            {
                text: "Simplify the core",
                consequences: [
                    { variable: "value", change: -1 },
                    { variable: "agility", change: 6 },
                    { variable: "complexity", change: -9 }
                ]
            },
            {
                text: "Preserve the core, redesign selectively",
                consequences: [
                    { variable: "value", change: 5 },
                    { variable: "agility", change: 2 },
                    { variable: "complexity", change: -3 }
                ]
            }
        ]
    },

    recovery: {
        title: "The Reckoning: Repair or Rebuild?",
        situation: "The recent shock exposed weaknesses in the way the system operates. Leadership now has to decide how much to change.",
        decisions: [
            {
                text: "Repair what exists",
                consequences: [
                    { variable: "value", change: 5 },
                    { variable: "agility", change: -2 },
                    { variable: "complexity", change: 4 }
                ]
            },
            {
                text: "Simplify and rebuild",
                consequences: [
                    { variable: "value", change: -3 },
                    { variable: "agility", change: 7 },
                    { variable: "complexity", change: -10 }
                ]
            },
            {
                text: "Contain the damage and move forward",
                consequences: [
                    { variable: "value", change: 2 },
                    { variable: "agility", change: 3 },
                    { variable: "complexity", change: -4 }
                ]
            }
        ]
    },

    resilient: {
        title: "The Reckoning: How Much Should We Change?",
        situation: "The system absorbed the shock better than expected. Leadership now has an opportunity to build on that adaptability.",
        decisions: [
            {
                text: "Scale what worked",
                consequences: [
                    { variable: "value", change: 8 },
                    { variable: "agility", change: -4 },
                    { variable: "complexity", change: 5 }
                ]
            },
            {
                text: "Standardize selectively",
                consequences: [
                    { variable: "value", change: 4 },
                    { variable: "agility", change: 2 },
                    { variable: "complexity", change: -3 }
                ]
            },
            {
                text: "Give teams more autonomy",
                consequences: [
                    { variable: "value", change: 6 },
                    { variable: "agility", change: 1 },
                    { variable: "complexity", change: 4 }
                ]
            }
        ]
    },

    underpowered: {
        title: "The Reckoning: Are We Too Safe?",
        situation: "The system is healthy and adaptable, but the organization has not captured enough business value from it.",
        decisions: [
            {
                text: "Invest for growth",
                consequences: [
                    { variable: "value", change: 8 },
                    { variable: "agility", change: -4 },
                    { variable: "complexity", change: 6 }
                ]
            },
            {
                text: "Stay disciplined",
                consequences: [
                    { variable: "value", change: 3 },
                    { variable: "agility", change: 3 },
                    { variable: "complexity", change: -3 }
                ]
            },
            {
                text: "Add targeted complexity",
                consequences: [
                    { variable: "value", change: 6 },
                    { variable: "agility", change: -1 },
                    { variable: "complexity", change: 4 }
                ]
            }
        ]
    },

    balanced: {
        title: "The Reckoning: What Kind of System Do We Want?",
        situation: "The system has no single dominant weakness. Leadership now has to choose what it wants to optimize for next.",
        decisions: [
            {
                text: "Push for more value",
                consequences: [
                    { variable: "value", change: 7 },
                    { variable: "agility", change: -4 },
                    { variable: "complexity", change: 5 }
                ]
            },
            {
                text: "Strengthen the system",
                consequences: [
                    { variable: "value", change: 3 },
                    { variable: "agility", change: 4 },
                    { variable: "complexity", change: -5 }
                ]
            },
            {
                text: "Preserve the balance",
                consequences: [
                    { variable: "value", change: 5 },
                    { variable: "agility", change: 1 },
                    { variable: "complexity", change: 1 }
                ]
            }
        ]
    }
};


// --------------------------------------------------
// SECOND-ORDER RULES
// --------------------------------------------------

const rules = [
    {
        id: "complexity_50",
        description: "Complexity crossed 50. The system loses some agility.",
        condition: function(previousState, newState) {
            return previousState.complexity <= 50 &&
                   newState.complexity > 50;
        },
        consequences: [
            { variable: "agility", change: -3 }
        ]
    },

    {
        id: "complexity_acceleration",
        description: "Complexity crossed 50. Future complexity increases become harder to absorb.",
        condition: function(previousState, newState) {
            return previousState.complexity <= 50 &&
                   newState.complexity > 50;
        },
        consequences: [
            { variable: "complexityMultiplier", change: 0.5 }
        ]
    },

    {
        id: "complexity_70",
        description: "Complexity crossed 70. The system becomes harder to change.",
        condition: function(previousState, newState) {
            return previousState.complexity <= 70 &&
                   newState.complexity > 70;
        },
        consequences: [
            { variable: "agility", change: -4 }
        ]
    },

    {
        id: "high_complexity_low_agility",
        description: "The system has entered a fragile state: high complexity is now constraining value.",
        condition: function(previousState, newState) {
            const wasFragile =
                previousState.complexity > 70 &&
                previousState.agility < 40;

            const isFragile =
                newState.complexity > 70 &&
                newState.agility < 40;

            return !wasFragile && isFragile;
        },
        consequences: [
            { variable: "value", change: -5 }
        ]
    },

    {
        id: "complexity_80",
        description: "Complexity crossed 80. A further agility penalty appears.",
        condition: function(previousState, newState) {
            return previousState.complexity <= 80 &&
                   newState.complexity > 80;
        },
        consequences: [
            { variable: "agility", change: -5 }
        ]
    },

    {
        id: "simplification_30",
        description: "Complexity fell below 30. The simpler system recovers some agility.",
        condition: function(previousState, newState) {
            return previousState.complexity >= 30 &&
                   newState.complexity < 30;
        },
        consequences: [
            { variable: "agility", change: 3 }
        ]
    }
];


// --------------------------------------------------
// GAME STATE
// --------------------------------------------------

let game = {
    round: 0,
    state: {
        value: 50,
        agility: 50,
        complexity: 40
    },
    modifiers: {
        complexityMultiplier: 1
    },
    lastState: null,
    history: {
        exception: 0,
        standardize: 0,
        holdStandard: 0,
        variation: 0,
        consolidate: 0,
        local: 0,
        centralize: 0,
        simplify: 0,
        preserve: 0,
        selective: 0,
        workaround: 0,
        formalize: 0
    },
    currentProfile: null
};


// --------------------------------------------------
// MAIN GAME FUNCTION
// --------------------------------------------------

function startGame() {
    game = {
        round: 0,
        state: {
            value: 50,
            agility: 50,
            complexity: 40
        },
        modifiers: {
            complexityMultiplier: 1
        },
        lastState: null,
        history: {
            exception: 0,
            standardize: 0,
            holdStandard: 0,
            variation: 0,
            consolidate: 0,
            local: 0,
            centralize: 0,
            simplify: 0,
            preserve: 0,
            selective: 0,
            workaround: 0,
            formalize: 0
        },
        currentProfile: null
    };

    document.getElementById("gameArea").classList.remove("hidden");
    document.getElementById("endScreen").classList.add("hidden");

    updateUI();
    renderRound();
}


// --------------------------------------------------
// ROUND DATA
// --------------------------------------------------

function getCurrentRound() {
    if (game.round < rounds.length) {
        return rounds[game.round];
    }

    if (game.round === 6) {
        return getR7Scenario();
    }

    if (game.round === 7) {
        return getR8Scenario();
    }

    return null;
}


// --------------------------------------------------
// STATE CLASSIFICATION
// --------------------------------------------------

function getR7Profile(state) {

    // Priority matters when conditions overlap.
    if (state.agility < 40 &&
        state.complexity >= 50) {
        return "strained";
    }

    if (state.complexity >= 50) {
        return "complex";
    }

    if (state.agility >= 60 &&
        state.complexity <= 40) {
        return "adaptive";
    }

    return "constrained";
}


function getR8Profile(state) {

    // Priority matters when conditions overlap.
    if (state.value >= 80 &&
        state.agility < 40 &&
        state.complexity >= 50) {
        return "fragileSuccess";
    }

    if (state.agility < 40 ||
        state.complexity >= 60 ||
        state.value < 60) {
        return "recovery";
    }

    if (state.value >= 70 &&
        state.agility >= 60 &&
        state.complexity <= 40) {
        return "resilient";
    }

    if (state.value < 70 &&
        state.agility >= 60 &&
        state.complexity <= 40) {
        return "underpowered";
    }

    return "balanced";
}


function getR7Scenario() {
    const profile = getR7Profile(game.state);
    game.currentProfile = profile;

    return r7Scenarios[profile];
}


function getR8Scenario() {
    const profile = getR8Profile(game.state);
    game.currentProfile = profile;

    return r8Scenarios[profile];
}


// --------------------------------------------------
// ROUND / UI FUNCTIONS
// --------------------------------------------------

function renderRound() {
    const round = getCurrentRound();

    if (!round) {
        return;
    }

    document.getElementById("roundNumber").textContent =
        (game.round + 1) + " / 8";

    document.getElementById("situationText").textContent =
        round.situation;

    const decisionButtons =
        document.getElementById("decisionButtons");

    decisionButtons.innerHTML = "";

    for (let i = 0; i < round.decisions.length; i++) {
        const decision = round.decisions[i];

        const button = document.createElement("button");
        button.className = "decision";

        button.innerHTML =
            '<div class="decision-number">OPTION ' +
            String.fromCharCode(65 + i) +
            '</div>' +
            '<div class="decision-text">' +
            decision.text +
            '</div>';

        button.onclick = function() {
            processDecision(decision);
        };

        decisionButtons.appendChild(button);
    }

    document.getElementById("consequencePanel").classList.add("hidden");
}


// --------------------------------------------------
// UI STATE
// --------------------------------------------------

function updateUI() {
    updateState("value");
    updateState("agility");
    updateState("complexity");
}


function updateState(variable) {
    const value = game.state[variable];

    document.getElementById(variable + "Number").textContent = value;
    document.getElementById(variable + "Bar").style.width = value + "%";
}


// --------------------------------------------------
// VALUE REALIZATION CURVE
// --------------------------------------------------

function getValueRealizationFactor(agility) {
    if (agility >= 60) return 1.0;
    if (agility >= 50) return 0.95;
    if (agility >= 40) return 0.85;
    if (agility >= 30) return 0.70;
    if (agility >= 20) return 0.50;
    return 0.30;
}


// --------------------------------------------------
// DECISION PIPELINE
// --------------------------------------------------

function processDecision(decision) {
    const previousState = copyState(game.state);

    // BOX 1: First-order effects
    const firstOrderResult =
        box1_firstOrder(game.state, decision);

    // BOX 2: Second-order / threshold effects
    const secondOrderResult =
        box2_secondOrder(
            previousState,
            firstOrderResult.state
        );

    game.lastState = previousState;
    game.state = secondOrderResult.state;

    recordHistory(decision);

    showConsequences(
        firstOrderResult.appliedEffects,
        secondOrderResult.appliedEffects
    );

    updateUI();

    disableDecisionButtons();
}


function box1_firstOrder(state, decision) {
    const newState = copyState(state);
    const appliedEffects = [];

    for (let i = 0; i < decision.consequences.length; i++) {
        const effect = decision.consequences[i];
        let change = effect.change;

        if (effect.variable === "complexity" &&
            state.complexity >= 50 &&
            game.modifiers.complexityMultiplier > 1) {
            change = change * game.modifiers.complexityMultiplier;
        }

        if (effect.variable === "value" && change > 0) {
            change = change * getValueRealizationFactor(state.agility);
        }

        newState[effect.variable] += change;

        if (newState[effect.variable] < 0) {
            newState[effect.variable] = 0;
        }

        if (newState[effect.variable] > 100) {
            newState[effect.variable] = 100;
        }

        appliedEffects.push({
            variable: effect.variable,
            change: change
        });
    }

    return {
        state: newState,
        outputs: [],
        appliedEffects: appliedEffects
    };
}


function box2_secondOrder(previousState, state) {
    const newState = copyState(state);
    let appliedEffects = [];

    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];

        if (rule.condition(previousState, newState)) {
            const stateEffects = [];
            const modifierEffects = [];

            for (let j = 0; j < rule.consequences.length; j++) {
                const effect = rule.consequences[j];

                if (effect.variable === "complexityMultiplier") {
                    game.modifiers.complexityMultiplier += effect.change;
                    modifierEffects.push(effect);
                } else {
                    stateEffects.push(effect);
                }
            }

            applyEffects(newState, stateEffects);

            appliedEffects.push({
                description: rule.description,
                consequences: rule.consequences
            });
        }
    }

    return {
        state: newState,
        outputs: [],
        appliedEffects: appliedEffects
    };
}


// --------------------------------------------------
// HISTORY
// --------------------------------------------------

function recordHistory(decision) {
    if (!decision.history) {
        return;
    }

    if (game.history[decision.history] !== undefined) {
        game.history[decision.history]++;
    }
}


// --------------------------------------------------
// GENERIC EFFECT FUNCTION
// --------------------------------------------------

function applyEffects(state, effects) {
    for (let i = 0; i < effects.length; i++) {
        const effect = effects[i];

        state[effect.variable] += effect.change;

        if (state[effect.variable] < 0) {
            state[effect.variable] = 0;
        }

        if (state[effect.variable] > 100) {
            state[effect.variable] = 100;
        }
    }
}


// --------------------------------------------------
// CONSEQUENCE DISPLAY
// --------------------------------------------------

function showConsequences(firstOrderEffects, secondOrderEffects) {
    const panel = document.getElementById("consequencePanel");
    const text = document.getElementById("consequenceText");

    let html = "<strong>Direct consequence</strong>";
    html += "<p>Positive Value is realized according to current Agility.</p>";
    html += '<ul class="consequence-list">';

    for (let i = 0; i < firstOrderEffects.length; i++) {
        const effect = firstOrderEffects[i];

        html += "<li>" +
            formatVariable(effect.variable) +
            ": " +
            formatChange(effect.change) +
            "</li>";
    }

    html += "</ul>";

    if (secondOrderEffects.length > 0) {
        html += '<div class="second-order">';
        html += "<strong>System effect</strong>";

        for (let i = 0; i < secondOrderEffects.length; i++) {
            const rule = secondOrderEffects[i];

            html += "<p>" + rule.description + "</p>";
            html += '<ul class="consequence-list">';

            for (let j = 0; j < rule.consequences.length; j++) {
                const effect = rule.consequences[j];

                if (effect.variable === "complexityMultiplier") {
                    html += "<li>Future Complexity changes are now multiplied by " +
                        game.modifiers.complexityMultiplier + "×</li>";
                } else {
                    html += "<li>" +
                        formatVariable(effect.variable) +
                        ": " +
                        formatChange(effect.change) +
                        "</li>";
                }
            }

            html += "</ul>";
        }

        html += "</div>";
    }

    text.innerHTML = html;
    panel.classList.remove("hidden");

    if (game.round === 7) {
        document.getElementById("nextButton").textContent =
            "See Final Result";
    } else {
        document.getElementById("nextButton").textContent =
            "Continue";
    }
}


function formatVariable(variable) {
    if (variable === "value") {
        return "Value";
    }

    if (variable === "agility") {
        return "Agility";
    }

    if (variable === "complexity") {
        return "Complexity";
    }

    return variable;
}


function formatChange(change) {
    const rounded = Math.round(change * 10) / 10;

    if (rounded > 0) {
        return "+" + rounded;
    }

    return String(rounded);
}


// --------------------------------------------------
// ROUND CONTROL
// --------------------------------------------------

function disableDecisionButtons() {
    const buttons =
        document.querySelectorAll(".decision");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        buttons[i].style.cursor = "default";
    }
}


function nextRound() {
    game.round++;

    if (game.round >= 8) {
        endGame();
        return;
    }

    renderRound();
}


// --------------------------------------------------
// FINAL RESULT
// --------------------------------------------------

function getFinalDiagnosis() {
    const value = game.state.value;
    const agility = game.state.agility;
    const complexity = game.state.complexity;

    if (value >= 80 &&
        agility >= 60 &&
        complexity <= 40) {

        return {
            title: "A resilient system",
            description:
                "You created strong business value while preserving the system's ability to adapt. Complexity remained manageable, allowing the organization to respond without repeatedly rebuilding what already exists. The system is not optimized for everything, but it has enough capacity to absorb change."
        };
    }

    if (value >= 80 &&
        agility < 40 &&
        complexity >= 50) {

        return {
            title: "A valuable but fragile system",
            description:
                "You created significant business value, but the system has become increasingly difficult to change. Complexity accumulated through individually reasonable decisions, gradually reducing agility. What works today may become tomorrow's constraint."
        };
    }

    if (value < 70 &&
        agility >= 60 &&
        complexity <= 40) {

        return {
            title: "An adaptive but underpowered system",
            description:
                "You kept the system simple and adaptable, but did not capture enough business value. The organization can change quickly, yet there is not enough value being created from that flexibility. Adaptability is useful only when it can be converted into outcomes."
        };
    }

    if (complexity >= 70 &&
        agility < 40) {

        return {
            title: "A system under strain",
            description:
                "The system still creates value, but accumulated complexity and declining agility are beginning to change how it behaves. Decisions that once seemed manageable now carry structural consequences. The system is approaching a point where responding to change will become increasingly difficult."
        };
    }

    if (value >= 70 &&
        agility >= 50 &&
        complexity <= 55) {

        return {
            title: "A balanced system",
            description:
                "You created meaningful value without allowing complexity or rigidity to dominate the system. Some trade-offs remain, but no single weakness has become structural. The system has room to evolve while continuing to deliver."
        };
    }

    return {
        title: "A system of trade-offs",
        description:
            "There was no perfect path. Your decisions created a system with meaningful strengths and weaknesses, but no single characteristic dominates the outcome. The result reflects the choices you made and the trade-offs you accepted along the way."
    };
}


function endGame() {
    document.getElementById("gameArea").classList.add("hidden");
    document.getElementById("endScreen").classList.remove("hidden");

    document.getElementById("finalValue").textContent =
        game.state.value;

    document.getElementById("finalAgility").textContent =
        game.state.agility;

    document.getElementById("finalComplexity").textContent =
        game.state.complexity;

    const diagnosis = getFinalDiagnosis();

    document.getElementById("endTitle").textContent =
        diagnosis.title;

    document.getElementById("endDescription").textContent =
        diagnosis.description;
}


// --------------------------------------------------
// UTILITY
// --------------------------------------------------

function copyState(state) {
    return {
        value: state.value,
        agility: state.agility,
        complexity: state.complexity
    };
}


// --------------------------------------------------
// BUTTONS
// --------------------------------------------------

document.getElementById("nextButton").onclick = function() {
    nextRound();
};

document.getElementById("restartButton").onclick = function() {
    startGame();
};


// --------------------------------------------------
// START THE GAME
// --------------------------------------------------

startGame();
