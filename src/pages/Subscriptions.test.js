// src/pages/Subscriptions.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Subscriptions from './Subscriptions';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('Subscriptions Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
    // Clear all alerts before each test
    global.alert = jest.fn();
  });

  const subscriptionData = [
    {
      id: 1,
      service: "Basic Subscription",
      serviceInfo: "For one User",
      price: 4.99,
      img: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3231802/ticket-icon-md.png",
      amount: 1,
    },
    {
      id: 2,
      service: "Gold Subscription",
      serviceInfo: "Share with Family",
      price: 9.99,
      img: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3237088/ticket-icon-md.png",
      amount: 1,
    },
  ];

  it('renders without crashing', () => {
    render(<Subscriptions />);
  });

  it('displays the "Subscriptions" heading', () => {
    render(<Subscriptions />);
    const headingElement = screen.getByText('Subscriptions');
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the correct number of subscription items', () => {
    render(<Subscriptions />);
    const subscriptionItems = screen.getAllByRole('listitem');
    expect(subscriptionItems.length).toBe(subscriptionData.length);
  });

  it('displays the correct service name and price for each subscription', () => {
    render(<Subscriptions />);
    subscriptionData.forEach((subscription) => {
      const serviceName = screen.getByText(`${subscription.service} - $${subscription.price.toFixed(2)}`);
      expect(serviceName).toBeInTheDocument();
    });
  });

  it('adds a subscription to the cart in localStorage', () => {
    render(<Subscriptions />);
    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([{ ...subscriptionData[0], quantity: 1 }])
    );
    expect(global.alert).toHaveBeenCalledWith(`${subscriptionData[0].service} subscription added to cart!`);
  });

  it('displays an alert if the subscription is already in the cart', () => {
    // Mock that the item is already in the cart
    localStorageMock.getItem.mockReturnValue(JSON.stringify([{ id: 1, service: "Basic Subscription", price: 4.99, quantity: 1 }]));

    render(<Subscriptions />);
    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);

    expect(global.alert).toHaveBeenCalledWith('You can only add one subscription at a time.');
  });
});
