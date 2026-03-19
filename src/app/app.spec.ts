import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { App } from './app';
import { provideRouter } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a signal title', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    // @ts-expect-error - Accediendo a propiedad protegida para testing
    expect(app.title()).toBe('btg-funds-app');
  });
});
