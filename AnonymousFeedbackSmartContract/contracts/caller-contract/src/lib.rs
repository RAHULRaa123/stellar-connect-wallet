#![no_std]

use soroban_sdk::{contract, contractimpl, Env, Address, Symbol, IntoVal, String};

#[contract]
pub struct CallerContract;

#[contractimpl]
impl CallerContract {
    pub fn call_hello(env: Env, contract_id: Address) {
        let message = String::from_str(&env, "Hello from caller");

        env.invoke_contract::<u32>(
            &contract_id,
            &Symbol::new(&env, "send_feedback"),
            (message,).into_val(&env),
        );
    }
}