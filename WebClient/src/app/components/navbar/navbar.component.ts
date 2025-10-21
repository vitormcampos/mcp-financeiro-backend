import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CashflowStore } from '../../stores/cashflow.store';

@Component({
  selector: 'app-navbar',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly cashFlowStore = inject(CashflowStore);

  userIsLoggedIn = this.authService.isLoggedIn();

  cashFlows = toSignal(this.cashFlowStore.get(), { initialValue: [] });

  totalCashFlow = computed(() => {
    const income = this.cashFlows().filter((cf) => cf.type === 'INCOME');
    const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);

    const expense = this.cashFlows().filter((cf) => cf.type === 'EXPENSE');
    const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);

    const investment = this.cashFlows().filter(
      (cf) => cf.type === 'INVESTMENT',
    );
    const totalInvestment = investment.reduce(
      (acc, curr) => acc + curr.amount,
      0,
    );

    return totalIncome - totalExpense - totalInvestment;
  });
}
