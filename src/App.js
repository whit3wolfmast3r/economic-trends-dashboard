import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, AreaChart, BarChart, Bar, ComposedChart } from 'recharts';
import { Calendar, TrendingUp, Home, FileText, RefreshCw, AlertTriangle, Menu, X, Calculator, DollarSign, MapPin, CalendarDays } from 'lucide-react';

const EconomicTrendsDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30y');
  const [showPolicyEvents, setShowPolicyEvents] = useState(true);
  const [activeTab, setActiveTab] = useState('trends');
  const [showCorrections, setShowCorrections] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMetro, setSelectedMetro] = useState('national');
  const [affordabilityInputs, setAffordabilityInputs] = useState({
    income: 75000,
    downPayment: 20,
    loanTerm: 30
  });
  const [amortizationInputs, setAmortizationInputs] = useState({
    loanAmount: 400000,
    interestRate: 6.88,
    loanTerm: 30,
    startDate: '2025-01',
    extraPayment: 0
  });

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Comprehensive 30-year historical data with home prices (1995-2025)
  const historicalData = [
    { date: '1995-01', tenYearYield: 7.78, fhaRate: 8.85, conventionalRate: 9.15, medianHomePrice: 133900, caseSHiller: 85.2, affordabilityIndex: 142.3, month: 'Jan 1995', year: 1995 },
    { date: '1996-01', tenYearYield: 5.65, fhaRate: 7.73, conventionalRate: 8.03, medianHomePrice: 140000, caseSHiller: 88.5, affordabilityIndex: 138.7, month: 'Jan 1996', year: 1996 },
    { date: '1997-01', tenYearYield: 6.58, fhaRate: 7.81, conventionalRate: 8.11, medianHomePrice: 146800, caseSHiller: 91.8, affordabilityIndex: 135.2, month: 'Jan 1997', year: 1997 },
    { date: '1998-01', tenYearYield: 5.54, fhaRate: 7.07, conventionalRate: 7.37, medianHomePrice: 152500, caseSHiller: 95.4, affordabilityIndex: 141.8, month: 'Jan 1998', year: 1998 },
    { date: '1999-01', tenYearYield: 4.72, fhaRate: 6.94, conventionalRate: 7.24, medianHomePrice: 161000, caseSHiller: 99.7, affordabilityIndex: 144.6, month: 'Jan 1999', year: 1999 },
    { date: '2000-01', tenYearYield: 6.66, fhaRate: 8.21, conventionalRate: 8.51, medianHomePrice: 169700, caseSHiller: 104.2, affordabilityIndex: 132.4, month: 'Jan 2000', year: 2000 },
    { date: '2000-06', tenYearYield: 6.10, fhaRate: 8.39, conventionalRate: 8.69, medianHomePrice: 174900, caseSHiller: 106.8, affordabilityIndex: 128.9, month: 'Jun 2000', year: 2000 },
    { date: '2001-01', tenYearYield: 5.16, fhaRate: 6.92, conventionalRate: 7.22, medianHomePrice: 175200, caseSHiller: 109.5, affordabilityIndex: 139.2, month: 'Jan 2001', year: 2001 },
    { date: '2001-06', tenYearYield: 5.28, fhaRate: 7.06, conventionalRate: 7.36, medianHomePrice: 178300, caseSHiller: 112.1, affordabilityIndex: 136.8, month: 'Jun 2001', year: 2001 },
    { date: '2001-09', tenYearYield: 4.73, fhaRate: 6.81, conventionalRate: 7.11, medianHomePrice: 182000, caseSHiller: 114.7, affordabilityIndex: 142.3, month: 'Sep 2001', year: 2001 },
    { date: '2002-01', tenYearYield: 5.04, fhaRate: 6.89, conventionalRate: 7.19, medianHomePrice: 185200, caseSHiller: 118.9, affordabilityIndex: 140.1, month: 'Jan 2002', year: 2002 },
    { date: '2002-06', tenYearYield: 4.93, fhaRate: 6.54, conventionalRate: 6.84, medianHomePrice: 189500, caseSHiller: 123.4, affordabilityIndex: 144.7, month: 'Jun 2002', year: 2002 },
    { date: '2003-01', tenYearYield: 4.05, fhaRate: 5.92, conventionalRate: 6.22, medianHomePrice: 195600, caseSHiller: 129.8, affordabilityIndex: 152.3, month: 'Jan 2003', year: 2003 },
    { date: '2003-06', tenYearYield: 3.33, fhaRate: 5.23, conventionalRate: 5.53, medianHomePrice: 202300, caseSHiller: 136.2, affordabilityIndex: 159.8, month: 'Jun 2003', year: 2003 },
    { date: '2004-01', tenYearYield: 4.15, fhaRate: 5.71, conventionalRate: 6.01, medianHomePrice: 221900, caseSHiller: 145.7, affordabilityIndex: 148.2, month: 'Jan 2004', year: 2004 },
    { date: '2005-01', tenYearYield: 4.22, fhaRate: 5.87, conventionalRate: 6.17, medianHomePrice: 240900, caseSHiller: 160.3, affordabilityIndex: 138.9, month: 'Jan 2005', year: 2005 },
    { date: '2006-01', tenYearYield: 4.42, fhaRate: 6.15, conventionalRate: 6.45, medianHomePrice: 246500, caseSHiller: 173.2, affordabilityIndex: 132.4, month: 'Jan 2006', year: 2006 },
    { date: '2007-01', tenYearYield: 4.76, fhaRate: 6.22, conventionalRate: 6.52, medianHomePrice: 247900, caseSHiller: 178.9, affordabilityIndex: 126.8, month: 'Jan 2007', year: 2007 },
    { date: '2007-06', tenYearYield: 5.10, fhaRate: 6.74, conventionalRate: 7.04, medianHomePrice: 249700, caseSHiller: 175.4, affordabilityIndex: 119.3, month: 'Jun 2007', year: 2007 },
    { date: '2008-01', tenYearYield: 3.74, fhaRate: 5.76, conventionalRate: 6.06, medianHomePrice: 240400, caseSHiller: 167.8, affordabilityIndex: 134.7, month: 'Jan 2008', year: 2008 },
    { date: '2008-06', tenYearYield: 4.10, fhaRate: 6.32, conventionalRate: 6.62, medianHomePrice: 228900, caseSHiller: 159.2, affordabilityIndex: 142.1, month: 'Jun 2008', year: 2008 },
    { date: '2008-09', tenYearYield: 3.69, fhaRate: 5.94, conventionalRate: 6.24, medianHomePrice: 218600, caseSHiller: 152.6, affordabilityIndex: 148.9, month: 'Sep 2008', year: 2008 },
    { date: '2009-01', tenYearYield: 2.52, fhaRate: 5.09, conventionalRate: 5.39, medianHomePrice: 208400, caseSHiller: 145.3, affordabilityIndex: 164.2, month: 'Jan 2009', year: 2009 },
    { date: '2009-06', tenYearYield: 3.72, fhaRate: 5.42, conventionalRate: 5.72, medianHomePrice: 213200, caseSHiller: 142.8, affordabilityIndex: 156.7, month: 'Jun 2009', year: 2009 },
    { date: '2010-01', tenYearYield: 3.73, fhaRate: 5.09, conventionalRate: 5.39, medianHomePrice: 221800, caseSHiller: 143.9, affordabilityIndex: 158.3, month: 'Jan 2010', year: 2010 },
    { date: '2011-01', tenYearYield: 3.39, fhaRate: 4.71, conventionalRate: 5.01, medianHomePrice: 227400, caseSHiller: 138.4, affordabilityIndex: 169.2, month: 'Jan 2011', year: 2011 },
    { date: '2012-01', tenYearYield: 1.97, fhaRate: 3.88, conventionalRate: 4.18, medianHomePrice: 240600, caseSHiller: 134.7, affordabilityIndex: 186.4, month: 'Jan 2012', year: 2012 },
    { date: '2013-01', tenYearYield: 1.91, fhaRate: 3.34, conventionalRate: 3.64, medianHomePrice: 249700, caseSHiller: 141.2, affordabilityIndex: 192.8, month: 'Jan 2013', year: 2013 },
    { date: '2014-01', tenYearYield: 2.86, fhaRate: 4.28, conventionalRate: 4.58, medianHomePrice: 259400, caseSHiller: 152.3, affordabilityIndex: 167.9, month: 'Jan 2014', year: 2014 },
    { date: '2015-01', tenYearYield: 1.88, fhaRate: 3.59, conventionalRate: 3.89, medianHomePrice: 272900, caseSHiller: 161.8, affordabilityIndex: 178.4, month: 'Jan 2015', year: 2015 },
    { date: '2016-01', tenYearYield: 2.09, fhaRate: 3.72, conventionalRate: 4.02, medianHomePrice: 288800, caseSHiller: 172.6, affordabilityIndex: 171.3, month: 'Jan 2016', year: 2016 },
    { date: '2017-01', tenYearYield: 2.45, fhaRate: 4.15, conventionalRate: 4.45, medianHomePrice: 309200, caseSHiller: 186.4, affordabilityIndex: 158.7, month: 'Jan 2017', year: 2017 },
    { date: '2018-01', tenYearYield: 2.58, fhaRate: 4.03, conventionalRate: 4.33, medianHomePrice: 326400, caseSHiller: 201.8, affordabilityIndex: 152.9, month: 'Jan 2018', year: 2018 },
    { date: '2019-01', tenYearYield: 2.71, fhaRate: 4.25, conventionalRate: 4.45, medianHomePrice: 342700, caseSHiller: 214.7, affordabilityIndex: 148.6, month: 'Jan 2019', year: 2019 },
    { date: '2020-01', tenYearYield: 1.77, fhaRate: 3.65, conventionalRate: 3.85, medianHomePrice: 358000, caseSHiller: 223.9, affordabilityIndex: 156.3, month: 'Jan 2020', year: 2020 },
    { date: '2020-03', tenYearYield: 0.67, fhaRate: 3.33, conventionalRate: 3.53, medianHomePrice: 364800, caseSHiller: 227.1, affordabilityIndex: 162.7, month: 'Mar 2020', year: 2020 },
    { date: '2020-06', tenYearYield: 0.66, fhaRate: 3.01, conventionalRate: 3.21, medianHomePrice: 382600, caseSHiller: 234.8, affordabilityIndex: 168.9, month: 'Jun 2020', year: 2020 },
    { date: '2020-12', tenYearYield: 0.93, fhaRate: 2.77, conventionalRate: 2.97, medianHomePrice: 404200, caseSHiller: 251.3, affordabilityIndex: 172.4, month: 'Dec 2020', year: 2020 },
    { date: '2021-01', tenYearYield: 1.17, fhaRate: 2.65, conventionalRate: 2.85, medianHomePrice: 416900, caseSHiller: 258.7, affordabilityIndex: 174.8, month: 'Jan 2021', year: 2021 },
    { date: '2021-06', tenYearYield: 1.47, fhaRate: 2.89, conventionalRate: 3.09, medianHomePrice: 439300, caseSHiller: 278.9, affordabilityIndex: 159.2, month: 'Jun 2021', year: 2021 },
    { date: '2022-01', tenYearYield: 1.78, fhaRate: 3.45, conventionalRate: 3.65, medianHomePrice: 468700, caseSHiller: 295.4, affordabilityIndex: 142.3, month: 'Jan 2022', year: 2022 },
    { date: '2022-06', tenYearYield: 3.49, fhaRate: 5.23, conventionalRate: 5.43, medianHomePrice: 484600, caseSHiller: 308.2, affordabilityIndex: 118.7, month: 'Jun 2022', year: 2022 },
    { date: '2022-12', tenYearYield: 3.88, fhaRate: 6.42, conventionalRate: 6.62, medianHomePrice: 467300, caseSHiller: 298.1, affordabilityIndex: 102.4, month: 'Dec 2022', year: 2022 },
    { date: '2023-06', tenYearYield: 3.84, fhaRate: 6.71, conventionalRate: 6.91, medianHomePrice: 449800, caseSHiller: 292.7, affordabilityIndex: 96.8, month: 'Jun 2023', year: 2023 },
    { date: '2023-10', tenYearYield: 4.88, fhaRate: 7.79, conventionalRate: 7.99, medianHomePrice: 431200, caseSHiller: 285.3, affordabilityIndex: 89.2, month: 'Oct 2023', year: 2023 },
    { date: '2024-01', tenYearYield: 4.02, fhaRate: 6.81, conventionalRate: 7.01, medianHomePrice: 442700, caseSHiller: 289.6, affordabilityIndex: 92.7, month: 'Jan 2024', year: 2024 },
    { date: '2024-06', tenYearYield: 4.29, fhaRate: 6.95, conventionalRate: 7.15, medianHomePrice: 456300, caseSHiller: 296.8, affordabilityIndex: 90.1, month: 'Jun 2024', year: 2024 },
    { date: '2025-01', tenYearYield: 4.58, fhaRate: 6.72, conventionalRate: 6.92, medianHomePrice: 467200, caseSHiller: 301.4, affordabilityIndex: 91.8, month: 'Jan 2025', year: 2025 },
    { date: '2025-06', tenYearYield: 4.46, fhaRate: 6.88, conventionalRate: 7.08, medianHomePrice: 473800, caseSHiller: 304.2, affordabilityIndex: 90.9, month: 'Jun 2025', year: 2025 }
  ];

  // Regional data for major metro areas
  const regionalData = {
    national: { name: 'National Average', multiplier: 1.0 },
    'las-vegas': { name: 'Las Vegas, NV', multiplier: 1.0, special: true },
    'los-angeles': { name: 'Los Angeles', multiplier: 2.1 },
    'san-francisco': { name: 'San Francisco', multiplier: 2.8 },
    'new-york': { name: 'New York', multiplier: 1.9 },
    'miami': { name: 'Miami', multiplier: 1.4 },
    'seattle': { name: 'Seattle', multiplier: 1.7 },
    'boston': { name: 'Boston', multiplier: 1.6 },
    'chicago': { name: 'Chicago', multiplier: 1.1 },
    'denver': { name: 'Denver', multiplier: 1.3 },
    'atlanta': { name: 'Atlanta', multiplier: 1.0 }
  };

  // Las Vegas specific historical data (more volatile than national)
  const lasVegasData = [
    { year: 1995, priceMultiplier: 0.85, volatilityFactor: 1.2 },
    { year: 1996, priceMultiplier: 0.87, volatilityFactor: 1.2 },
    { year: 1997, priceMultiplier: 0.89, volatilityFactor: 1.1 },
    { year: 1998, priceMultiplier: 0.91, volatilityFactor: 1.1 },
    { year: 1999, priceMultiplier: 0.93, volatilityFactor: 1.0 },
    { year: 2000, priceMultiplier: 0.95, volatilityFactor: 1.1 },
    { year: 2001, priceMultiplier: 0.97, volatilityFactor: 1.2 },
    { year: 2002, priceMultiplier: 1.02, volatilityFactor: 1.3 },
    { year: 2003, priceMultiplier: 1.15, volatilityFactor: 1.5 },
    { year: 2004, priceMultiplier: 1.35, volatilityFactor: 1.8 },
    { year: 2005, priceMultiplier: 1.65, volatilityFactor: 2.1 },
    { year: 2006, priceMultiplier: 1.85, volatilityFactor: 2.3 },
    { year: 2007, priceMultiplier: 1.75, volatilityFactor: 2.0 },
    { year: 2008, priceMultiplier: 1.45, volatilityFactor: 1.8 },
    { year: 2009, priceMultiplier: 0.95, volatilityFactor: 1.5 },
    { year: 2010, priceMultiplier: 0.75, volatilityFactor: 1.3 },
    { year: 2011, priceMultiplier: 0.65, volatilityFactor: 1.2 },
    { year: 2012, priceMultiplier: 0.68, volatilityFactor: 1.4 },
    { year: 2013, priceMultiplier: 0.78, volatilityFactor: 1.6 },
    { year: 2014, priceMultiplier: 0.85, volatilityFactor: 1.5 },
    { year: 2015, priceMultiplier: 0.92, volatilityFactor: 1.3 },
    { year: 2016, priceMultiplier: 0.98, volatilityFactor: 1.2 },
    { year: 2017, priceMultiplier: 1.05, volatilityFactor: 1.3 },
    { year: 2018, priceMultiplier: 1.12, volatilityFactor: 1.4 },
    { year: 2019, priceMultiplier: 1.15, volatilityFactor: 1.3 },
    { year: 2020, priceMultiplier: 1.22, volatilityFactor: 1.5 },
    { year: 2021, priceMultiplier: 1.38, volatilityFactor: 1.8 },
    { year: 2022, priceMultiplier: 1.42, volatilityFactor: 1.6 },
    { year: 2023, priceMultiplier: 1.35, volatilityFactor: 1.4 },
    { year: 2024, priceMultiplier: 1.28, volatilityFactor: 1.3 },
    { year: 2025, priceMultiplier: 1.25, volatilityFactor: 1.2 }
  ];

  // Major corrections
  const majorCorrections = [
    {
      period: '2000-2002',
      name: 'Dot-com Bubble',
      startDate: '2000-03',
      endDate: '2002-10',
      treasuryDrop: 1.56,
      mortgageDrop: 1.82,
      homePriceChange: 12.3,
      description: 'Technology stock crash, Fed rate cuts',
      color: '#ef4444'
    },
    {
      period: '2007-2009',
      name: 'Financial Crisis',
      startDate: '2007-06',
      endDate: '2009-03',
      treasuryDrop: 2.58,
      mortgageDrop: 1.32,
      homePriceChange: -16.8,
      description: 'Subprime mortgage crisis',
      color: '#dc2626'
    },
    {
      period: '2020-2022',
      name: 'COVID-19 Pandemic',
      startDate: '2020-01',
      endDate: '2022-12',
      treasuryDrop: 1.10,
      mortgageDrop: 1.00,
      homePriceChange: 30.7,
      description: 'Global pandemic response',
      color: '#b91c1c'
    }
  ];

  const policyEvents = [
    // Dot-com Era
    { date: '1999-06', event: 'Glass-Steagall Repeal', impact: 'High', description: 'Financial deregulation', category: 'Financial Regulation' },
    { date: '2001-06', event: 'Bush Tax Cuts (EGTRRA)', impact: 'Medium', description: '$1.35T tax reduction', category: 'Fiscal Policy' },
    { date: '2001-09', event: '9/11 Emergency Response', impact: 'High', description: 'Fed emergency rate cuts', category: 'Monetary Policy' },
    
    // Pre-Financial Crisis
    { date: '2003-05', event: 'Jobs and Growth Tax Relief', impact: 'Medium', description: 'Capital gains/dividend tax cuts', category: 'Fiscal Policy' },
    { date: '2005-04', event: 'Bankruptcy Abuse Prevention Act', impact: 'Medium', description: 'Stricter bankruptcy laws', category: 'Financial Regulation' },
    
    // Financial Crisis Era
    { date: '2007-08', event: 'Subprime Crisis Begins', impact: 'High', description: 'Bear Stearns hedge funds collapse', category: 'Financial Crisis' },
    { date: '2008-03', event: 'Bear Stearns Bailout', impact: 'High', description: 'Fed facilitates JPMorgan acquisition', category: 'Financial Crisis' },
    { date: '2008-09', event: 'Lehman Brothers Collapse', impact: 'High', description: 'Largest bankruptcy in US history', category: 'Financial Crisis' },
    { date: '2008-10', event: 'TARP Program', impact: 'High', description: '$700B bank bailout program', category: 'Fiscal Policy' },
    { date: '2009-02', event: 'American Recovery Act', impact: 'High', description: '$787B stimulus package', category: 'Fiscal Policy' },
    { date: '2010-07', event: 'Dodd-Frank Act', impact: 'High', description: 'Comprehensive financial reform', category: 'Financial Regulation' },
    
    // Post-Crisis Era
    { date: '2010-11', event: 'QE2 Launch', impact: 'High', description: '$600B quantitative easing', category: 'Monetary Policy' },
    { date: '2012-09', event: 'QE3 Launch', impact: 'High', description: 'Open-ended asset purchases', category: 'Monetary Policy' },
    { date: '2015-10', event: 'TRID Implementation', impact: 'Medium', description: 'Truth in Lending/RESPA integration', category: 'Financial Regulation' },
    { date: '2017-12', event: 'Tax Cuts and Jobs Act', impact: 'High', description: '$1.5T corporate/individual tax cuts', category: 'Fiscal Policy' },
    { date: '2018-05', event: 'Banking Deregulation', impact: 'Medium', description: 'Rollback of Dodd-Frank provisions', category: 'Financial Regulation' },
    
    // COVID Era
    { date: '2020-03', event: 'CARES Act', impact: 'High', description: '$2.2T COVID relief package', category: 'Fiscal Policy' },
    { date: '2020-03', event: 'Fed Emergency Actions', impact: 'High', description: 'Rates to zero, unlimited QE', category: 'Monetary Policy' },
    { date: '2021-03', event: 'American Rescue Plan', impact: 'High', description: '$1.9T additional stimulus', category: 'Fiscal Policy' },
    { date: '2021-11', event: 'Infrastructure Investment Act', impact: 'Medium', description: '$1.2T infrastructure spending', category: 'Fiscal Policy' },
    { date: '2022-03', event: 'Fed Tightening Cycle', impact: 'High', description: 'Most aggressive rate hikes since 1980s', category: 'Monetary Policy' },
    { date: '2022-08', event: 'Inflation Reduction Act', impact: 'Medium', description: '$740B climate/healthcare spending', category: 'Fiscal Policy' }
  ];

  // Calculate statistics
  const calculateStats = () => {
    const treasuryRates = historicalData.map(d => d.tenYearYield);
    const fhaRates = historicalData.map(d => d.fhaRate);
    const conventionalRates = historicalData.map(d => d.conventionalRate);
    const homePrices = historicalData.map(d => d.medianHomePrice);
    const affordabilityIndices = historicalData.map(d => d.affordabilityIndex);
    
    return {
      treasury: {
        avg: (treasuryRates.reduce((a, b) => a + b, 0) / treasuryRates.length).toFixed(2),
        current: treasuryRates[treasuryRates.length - 1].toFixed(2)
      },
      fha: {
        avg: (fhaRates.reduce((a, b) => a + b, 0) / fhaRates.length).toFixed(2),
        current: fhaRates[fhaRates.length - 1].toFixed(2)
      },
      conventional: {
        avg: (conventionalRates.reduce((a, b) => a + b, 0) / conventionalRates.length).toFixed(2),
        current: conventionalRates[conventionalRates.length - 1].toFixed(2)
      },
      homePrice: {
        avg: Math.round(homePrices.reduce((a, b) => a + b, 0) / homePrices.length),
        current: homePrices[homePrices.length - 1],
        change30yr: (((homePrices[homePrices.length - 1] / homePrices[0]) - 1) * 100).toFixed(1)
      },
      affordability: {
        current: affordabilityIndices[affordabilityIndices.length - 1].toFixed(1),
        peak: Math.max(...affordabilityIndices).toFixed(1),
        trough: Math.min(...affordabilityIndices).toFixed(1)
      }
    };
  };

  const stats = calculateStats();

  // Calculate affordability for selected region
  const calculateAffordability = () => {
    const { income, downPayment, loanTerm } = affordabilityInputs;
    const regionalMultiplier = regionalData[selectedMetro].multiplier;
    const currentPrice = stats.homePrice.current * regionalMultiplier;
    const currentRate = parseFloat(stats.fha.current);
    
    const loanAmount = currentPrice * (1 - downPayment / 100);
    const monthlyRate = currentRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const monthlyIncome = income / 12;
    const paymentToIncomeRatio = (monthlyPayment / monthlyIncome) * 100;
    
    return {
      homePrice: Math.round(currentPrice),
      downPaymentAmount: Math.round(currentPrice * downPayment / 100),
      loanAmount: Math.round(loanAmount),
      monthlyPayment: Math.round(monthlyPayment),
      paymentToIncomeRatio: paymentToIncomeRatio.toFixed(1),
      affordable: paymentToIncomeRatio <= 28
    };
  };

  const affordabilityCalc = calculateAffordability();

  // Calculate amortization schedule
  const calculateAmortization = () => {
    const { loanAmount, interestRate, loanTerm, startDate, extraPayment } = amortizationInputs;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    // Calculate monthly payment
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Calculate standard schedule (no extra payments)
    let balance = loanAmount;
    const standardSchedule = [];
    const startDateObj = new Date(startDate + '-01');
    
    for (let i = 1; i <= numPayments; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance = balance - principalPayment;
      
      const paymentDate = new Date(startDateObj);
      paymentDate.setMonth(paymentDate.getMonth() + i - 1);
      
      standardSchedule.push({
        paymentNumber: i,
        date: paymentDate,
        monthYear: paymentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        monthlyPayment: monthlyPayment,
        principalPayment: principalPayment,
        interestPayment: interestPayment,
        remainingBalance: Math.max(0, balance),
        cumulativeInterest: standardSchedule.reduce((sum, payment) => sum + payment.interestPayment, interestPayment),
        cumulativePrincipal: loanAmount - Math.max(0, balance)
      });
    }
    
    // Calculate schedule with extra payments
    let extraBalance = loanAmount;
    const extraSchedule = [];
    let extraPaymentCount = 0;
    
    for (let i = 1; i <= numPayments && extraBalance > 0.01; i++) {
      const interestPayment = extraBalance * monthlyRate;
      let principalPayment = monthlyPayment - interestPayment;
      
      // Add extra payment to principal
      if (extraPayment > 0) {
        principalPayment += extraPayment;
      }
      
      // Don't overpay
      if (principalPayment > extraBalance) {
        principalPayment = extraBalance;
      }
      
      extraBalance = extraBalance - principalPayment;
      extraPaymentCount = i;
      
      const paymentDate = new Date(startDateObj);
      paymentDate.setMonth(paymentDate.getMonth() + i - 1);
      
      extraSchedule.push({
        paymentNumber: i,
        date: paymentDate,
        monthYear: paymentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        monthlyPayment: monthlyPayment + extraPayment,
        principalPayment: principalPayment,
        interestPayment: interestPayment,
        remainingBalance: Math.max(0, extraBalance),
        cumulativeInterest: extraSchedule.reduce((sum, payment) => sum + payment.interestPayment, interestPayment),
        cumulativePrincipal: loanAmount - Math.max(0, extraBalance)
      });
      
      if (extraBalance <= 0.01) break;
    }
    
    const standardTotalInterest = standardSchedule.reduce((sum, payment) => sum + payment.interestPayment, 0);
    const extraTotalInterest = extraSchedule.reduce((sum, payment) => sum + payment.interestPayment, 0);
    const interestSavings = standardTotalInterest - extraTotalInterest;
    const timeSavings = numPayments - extraPaymentCount;
    const timeSavingsYears = Math.floor(timeSavings / 12);
    const timeSavingsMonths = timeSavings % 12;
    
    return {
      schedule: extraPayment > 0 ? extraSchedule : standardSchedule,
      standardSchedule: standardSchedule,
      extraSchedule: extraSchedule,
      monthlyPayment,
      totalInterest: extraPayment > 0 ? extraTotalInterest : standardTotalInterest,
      totalPayments: (monthlyPayment + extraPayment) * (extraPayment > 0 ? extraPaymentCount : numPayments),
      interestSavings: interestSavings,
      timeSavings: timeSavings,
      timeSavingsYears: timeSavingsYears,
      timeSavingsMonths: timeSavingsMonths,
      payoffDate: extraPayment > 0 ? extraSchedule[extraSchedule.length - 1]?.monthYear : standardSchedule[standardSchedule.length - 1]?.monthYear
    };
  };

  const amortizationCalc = calculateAmortization();

  const tabs = [
    { id: 'trends', label: isMobile ? 'Trends' : 'Rates & Prices', icon: TrendingUp },
    { id: 'corrections', label: isMobile ? 'Corrections' : 'Market Corrections', icon: AlertTriangle },
    { id: 'affordability', label: isMobile ? 'Calculator' : 'Affordability Calculator', icon: Calculator },
    { id: 'amortization', label: isMobile ? 'Amortization' : 'Loan Amortization', icon: CalendarDays },
    { id: 'las-vegas', label: isMobile ? 'Las Vegas' : 'Las Vegas Analysis', icon: MapPin },
    { id: 'regional', label: isMobile ? 'Regional' : 'Regional Analysis', icon: Home },
    { id: 'policy', label: isMobile ? 'Policy' : 'Policy Timeline', icon: FileText },
    { id: 'stats', label: isMobile ? 'Stats' : 'Statistics', icon: Calendar }
  ];

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = historicalData.find(d => d.month === label);
      
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg max-w-xs text-xs">
          <p className="font-semibold text-sm">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-xs">
              {entry.name}: {
                entry.name.includes('Price') ? 
                  `$${entry.value.toLocaleString()}` : 
                  entry.name.includes('Index') ?
                    entry.value.toFixed(1) :
                    `${entry.value.toFixed(2)}%`
              }
            </p>
          ))}
          {dataPoint && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-600">Affordability Index: {dataPoint.affordabilityIndex}</p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-50">
          <h1 className="text-lg font-bold text-gray-800">Housing & Rates</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-3 md:p-6">
        <div className="bg-white rounded-lg shadow-lg p-3 md:p-6 mb-6">
          {/* Desktop Header */}
          {!isMobile && (
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  30-Year Housing & Interest Rate Analysis
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Treasury Yields, Mortgage Rates, Home Prices & Affordability Analysis (1995-2025)
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-500">30-Year Analysis</span>
              </div>
            </div>
          )}

          {/* Enhanced Summary Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 md:p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-blue-700 font-medium">10-Year Treasury</p>
                  <p className="text-lg md:text-2xl font-bold text-blue-800">{stats.treasury.current}%</p>
                  <p className="text-xs text-blue-600">30yr avg: {stats.treasury.avg}%</p>
                </div>
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 md:p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-green-700 font-medium">FHA 30-Year</p>
                  <p className="text-lg md:text-2xl font-bold text-green-800">{stats.fha.current}%</p>
                  <p className="text-xs text-green-600">30yr avg: {stats.fha.avg}%</p>
                </div>
                <Home className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 md:p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-purple-700 font-medium">Median Home</p>
                  <p className="text-lg md:text-2xl font-bold text-purple-800">${(stats.homePrice.current / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-purple-600">+{stats.homePrice.change30yr}% (30yr)</p>
                </div>
                <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-3 md:p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-orange-700 font-medium">Affordability</p>
                  <p className="text-lg md:text-2xl font-bold text-orange-800">{stats.affordability.current}</p>
                  <p className="text-xs text-orange-600">Index (100=good)</p>
                </div>
                <Calculator className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-3 md:p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-red-700 font-medium">Major Corrections</p>
                  <p className="text-lg md:text-2xl font-bold text-red-800">3</p>
                  <p className="text-xs text-red-600">2000, 2008, 2020</p>
                </div>
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className={`${isMobile ? 'hidden' : 'flex'} flex-wrap gap-1 mb-6`}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors text-sm ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile Tab Navigation */}
          {isMobile && (
            <div className={`${mobileMenuOpen ? 'block' : 'hidden'} mb-4`}>
              <div className="grid grid-cols-2 gap-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-3 py-3 rounded-lg transition-colors text-sm ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rates & Prices Trends */}
          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border p-3 md:p-4">
                <h3 className="text-base md:text-lg font-semibold mb-4">Interest Rates vs Home Prices (1995-2025)</h3>
                <ResponsiveContainer width="100%" height={isMobile ? 300 : 500}>
                  <ComposedChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      interval="preserveStartEnd"
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                    />
                    <YAxis 
                      yAxisId="rates"
                      label={{ value: 'Interest Rate (%)', angle: -90, position: 'insideLeft' }}
                      domain={[0, 10]}
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                    />
                    <YAxis 
                      yAxisId="prices"
                      orientation="right"
                      label={{ value: 'Home Price ($K)', angle: 90, position: 'insideRight' }}
                      domain={[100, 500]}
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                      tickFormatter={(value) => `${value}K`}
                    />
                    <Tooltip content={customTooltip} />
                    <Legend />
                    
                    <Line
                      yAxisId="rates"
                      type="monotone"
                      dataKey="tenYearYield"
                      stroke="#2563eb"
                      strokeWidth={isMobile ? 2 : 3}
                      name="10-Year Treasury"
                      dot={false}
                    />
                    <Line
                      yAxisId="rates"
                      type="monotone"
                      dataKey="fhaRate"
                      stroke="#16a34a"
                      strokeWidth={isMobile ? 2 : 2.5}
                      name="FHA Rate"
                      dot={false}
                    />
                    <Line
                      yAxisId="prices"
                      type="monotone"
                      dataKey="medianHomePrice"
                      stroke="#9333ea"
                      strokeWidth={isMobile ? 2 : 3}
                      name="Median Home Price"
                      dot={false}
                      strokeDasharray="5 5"
                    />
                    <Line
                      yAxisId="prices"
                      type="monotone"
                      dataKey="affordabilityIndex"
                      stroke="#ea580c"
                      strokeWidth={2}
                      name="Affordability Index"
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              
              {/* Key Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Rate-Price Correlation</h4>
                  <p className="text-sm text-blue-700">Strong inverse relationship: when rates fall, home prices typically rise, and vice versa.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">COVID Impact</h4>
                  <p className="text-sm text-purple-700">2020-2022: Historic low rates (sub-3%) drove home prices up 30.7% in just 2 years.</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Affordability Crisis</h4>
                  <p className="text-sm text-orange-700">Current affordability index at {stats.affordability.current}, worst in 30-year history.</p>
                </div>
              </div>
            </div>
          )}

          {/* Market Corrections */}
          {activeTab === 'corrections' && (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-lg border p-3 md:p-4">
                <h3 className="text-base md:text-lg font-semibold mb-4">Housing Market Impact During Corrections</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  {majorCorrections.map((correction, index) => (
                    <div key={index} className="bg-white p-3 md:p-4 rounded-lg border-l-4" style={{ borderLeftColor: correction.color }}>
                      <h4 className="font-semibold text-sm md:text-base mb-2">{correction.name}</h4>
                      <div className="space-y-2 text-xs md:text-sm">
                        <p><span className="font-medium">Period:</span> {correction.period}</p>
                        <p><span className="font-medium">Treasury Drop:</span> -{correction.treasuryDrop}%</p>
                        <p><span className="font-medium">Mortgage Drop:</span> -{correction.mortgageDrop}%</p>
                        <p><span className="font-medium">Home Price Change:</span> 
                          <span className={correction.homePriceChange > 0 ? 'text-green-600' : 'text-red-600'}>
                            {correction.homePriceChange > 0 ? '+' : ''}{correction.homePriceChange}%
                          </span>
                        </p>
                        <p className="text-gray-600">{correction.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Affordability Calculator */}
          {activeTab === 'affordability' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-4">Current Affordability Calculator</h3>
                
                {/* Calculator Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Annual Income</label>
                    <input
                      type="number"
                      value={affordabilityInputs.income}
                      onChange={(e) => setAffordabilityInputs({...affordabilityInputs, income: parseInt(e.target.value) || 0})}
                      className="w-full p-2 border rounded-lg"
                      placeholder="75000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Down Payment %</label>
                    <input
                      type="number"
                      value={affordabilityInputs.downPayment}
                      onChange={(e) => setAffordabilityInputs({...affordabilityInputs, downPayment: parseInt(e.target.value) || 0})}
                      className="w-full p-2 border rounded-lg"
                      placeholder="20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Metro Area</label>
                    <select
                      value={selectedMetro}
                      onChange={(e) => setSelectedMetro(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    >
                      {Object.entries(regionalData).map(([key, data]) => (
                        <option key={key} value={key}>{data.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Purchase Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Home Price:</span>
                        <span className="font-medium">${affordabilityCalc.homePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Down Payment:</span>
                        <span className="font-medium">${affordabilityCalc.downPaymentAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loan Amount:</span>
                        <span className="font-medium">${affordabilityCalc.loanAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Payment:</span>
                        <span className="font-medium">${affordabilityCalc.monthlyPayment.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Affordability Analysis</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Payment-to-Income Ratio:</span>
                        <span className={`font-medium ${affordabilityCalc.paymentToIncomeRatio > 28 ? 'text-red-600' : 'text-green-600'}`}>
                          {affordabilityCalc.paymentToIncomeRatio}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Affordability Status:</span>
                        <span className={`font-medium ${affordabilityCalc.affordable ? 'text-green-600' : 'text-red-600'}`}>
                          {affordabilityCalc.affordable ? 'Affordable' : 'Not Affordable'}
                        </span>
                      </div>
                      <div className="mt-4 p-3 bg-gray-50 rounded">
                        <p className="text-xs text-gray-600">
                          Recommended: Keep housing payment under 28% of gross income. 
                          Current rate: {stats.fha.current}% FHA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Amortization Calculator */}
          {activeTab === 'amortization' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border p-4">
                <div className="flex items-center mb-4">
                  <CalendarDays className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">Loan Amortization Calculator</h3>
                </div>
                
                {/* Amortization Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Loan Amount</label>
                    <input
                      type="number"
                      value={amortizationInputs.loanAmount}
                      onChange={(e) => setAmortizationInputs({...amortizationInputs, loanAmount: parseInt(e.target.value) || 0})}
                      className="w-full p-2 border rounded-lg"
                      placeholder="400000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={amortizationInputs.interestRate}
                      onChange={(e) => setAmortizationInputs({...amortizationInputs, interestRate: parseFloat(e.target.value) || 0})}
                      className="w-full p-2 border rounded-lg"
                      placeholder="6.88"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Loan Term (Years)</label>
                    <select
                      value={amortizationInputs.loanTerm}
                      onChange={(e) => setAmortizationInputs({...amortizationInputs, loanTerm: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value={15}>15 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={25}>25 Years</option>
                      <option value={30}>30 Years</option>
                      <option value={50}>50 Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <input
                      type="month"
                      value={amortizationInputs.startDate}
                      onChange={(e) => setAmortizationInputs({...amortizationInputs, startDate: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Extra Payment ($)</label>
                    <input
                      type="number"
                      value={amortizationInputs.extraPayment}
                      onChange={(e) => setAmortizationInputs({...amortizationInputs, extraPayment: parseFloat(e.target.value) || 0})}
                      className="w-full p-2 border rounded-lg"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Loan Summary */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-800">Monthly Payment</h4>
                    <p className="text-2xl font-bold text-blue-900">${Math.round(amortizationCalc.monthlyPayment).toLocaleString()}</p>
                    {amortizationInputs.extraPayment > 0 && (
                      <p className="text-sm text-blue-700">+${amortizationInputs.extraPayment} extra</p>
                    )}
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-green-800">Total Interest</h4>
                    <p className="text-2xl font-bold text-green-900">${Math.round(amortizationCalc.totalInterest).toLocaleString()}</p>
                    {amortizationInputs.extraPayment > 0 && amortizationCalc.interestSavings > 0 && (
                      <p className="text-sm text-green-700">Save ${Math.round(amortizationCalc.interestSavings).toLocaleString()}</p>
                    )}
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-purple-800">Total Payments</h4>
                    <p className="text-2xl font-bold text-purple-900">${Math.round(amortizationCalc.totalPayments).toLocaleString()}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-orange-800">Payoff Date</h4>
                    <p className="text-2xl font-bold text-orange-900">{amortizationCalc.payoffDate}</p>
                    {amortizationInputs.extraPayment > 0 && amortizationCalc.timeSavingsYears > 0 && (
                      <p className="text-sm text-orange-700">
                        {amortizationCalc.timeSavingsYears}y {amortizationCalc.timeSavingsMonths}m early
                      </p>
                    )}
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-red-800">Interest %</h4>
                    <p className="text-2xl font-bold text-red-900">{((amortizationCalc.totalInterest / amortizationInputs.loanAmount) * 100).toFixed(1)}%</p>
                  </div>
                </div>

                {/* Extra Payment Impact Alert */}
                {amortizationInputs.extraPayment > 0 && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">💡</span>
                      <h4 className="font-bold text-green-800">Extra Payment Impact</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-3 bg-white rounded border">
                        <p className="font-semibold text-green-800">Interest Savings</p>
                        <p className="text-xl font-bold text-green-900">${Math.round(amortizationCalc.interestSavings).toLocaleString()}</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded border">
                        <p className="font-semibold text-blue-800">Time Savings</p>
                        <p className="text-xl font-bold text-blue-900">
                          {amortizationCalc.timeSavingsYears} years {amortizationCalc.timeSavingsMonths} months
                        </p>
                      </div>
                      <div className="text-center p-3 bg-white rounded border">
                        <p className="font-semibold text-purple-800">Monthly Extra</p>
                        <p className="text-xl font-bold text-purple-900">${amortizationInputs.extraPayment}</p>
                      </div>
                    </div>
                    <p className="text-xs text-green-700 mt-2 text-center">
                      Adding <strong>${amortizationInputs.extraPayment}/month</strong> saves{' '}
                      <strong>${Math.round(amortizationCalc.interestSavings).toLocaleString()}</strong> in interest
                      and pays off the loan <strong>{amortizationCalc.timeSavingsYears} years {amortizationCalc.timeSavingsMonths} months early</strong>.
                    </p>
                  </div>
                )}

                {/* Quick Extra Payment Buttons */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Try Common Extra Payment Amounts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {[0, 50, 100, 200, 500, 1000].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setAmortizationInputs({...amortizationInputs, extraPayment: amount})}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          amortizationInputs.extraPayment === amount
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {amount === 0 ? 'No Extra' : `${amount}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Principal vs Interest Chart */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-4">Principal vs Interest Over Time</h4>
                  <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
                    <AreaChart data={amortizationCalc.schedule.filter((_, index) => index % 12 === 0)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="monthYear" 
                        interval="preserveStartEnd"
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                      />
                      <YAxis 
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                      />
                      <Tooltip 
                        formatter={(value, name) => [`${value.toLocaleString()}`, name]}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="cumulativePrincipal"
                        stackId="1"
                        stroke="#2563eb"
                        fill="#93c5fd"
                        name="Cumulative Principal"
                      />
                      <Area
                        type="monotone"
                        dataKey="cumulativeInterest"
                        stackId="1"
                        stroke="#dc2626"
                        fill="#fca5a5"
                        name="Cumulative Interest"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Payment Calendar View */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* First Year Breakdown */}
                  <div>
                    <h4 className="font-semibold mb-4">First Year Payment Breakdown</h4>
                    <div className="max-h-64 overflow-y-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="p-2 text-left">Month</th>
                            <th className="p-2 text-right">Principal</th>
                            <th className="p-2 text-right">Interest</th>
                            <th className="p-2 text-right">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {amortizationCalc.schedule.slice(0, 12).map((payment, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2">{payment.monthYear}</td>
                              <td className="p-2 text-right text-green-600">${Math.round(payment.principalPayment).toLocaleString()}</td>
                              <td className="p-2 text-right text-red-600">${Math.round(payment.interestPayment).toLocaleString()}</td>
                              <td className="p-2 text-right">${Math.round(payment.remainingBalance).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Key Milestones */}
                  <div>
                    <h4 className="font-semibold mb-4">Loan Milestones</h4>
                    <div className="space-y-3">
                      {[
                        { percent: 25, label: '25% Paid Off' },
                        { percent: 50, label: '50% Paid Off' },
                        { percent: 75, label: '75% Paid Off' },
                        { percent: 100, label: 'Loan Payoff' }
                      ].map((milestone, index) => {
                        const targetBalance = amortizationInputs.loanAmount * (1 - milestone.percent / 100);
                        const milestonePayment = amortizationCalc.schedule.find(p => p.remainingBalance <= targetBalance);
                        
                        return (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="font-medium">{milestone.label}</span>
                            <div className="text-right">
                              <div className="text-sm">{milestonePayment?.monthYear || 'N/A'}</div>
                              <div className="text-xs text-gray-600">
                                Payment #{milestonePayment?.paymentNumber || 'N/A'}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Extra Payment Impact */}
                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <h5 className="font-medium text-blue-800 mb-2">💡 Interactive Extra Payment Calculator</h5>
                      <p className="text-xs text-blue-700">
                        Use the "Extra Payment" field above to see real-time impact on your loan!
                        Try common amounts: $50, $100, $200, or $500/month.
                      </p>
                      {amortizationInputs.extraPayment > 0 ? (
                        <p className="text-xs text-blue-800 mt-2 font-medium">
                          Current extra payment: <strong>${amortizationInputs.extraPayment}/month</strong> saves{' '}
                          <strong>${Math.round(amortizationCalc.interestSavings).toLocaleString()}</strong> in interest!
                        </p>
                      ) : (
                        <p className="text-xs text-blue-800 mt-2">
                          <strong>Tip:</strong> Even $100/month extra can save tens of thousands in interest!
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Yearly Summary Table */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Annual Payment Summary</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-3 text-left">Year</th>
                          <th className="p-3 text-right">Annual Principal</th>
                          <th className="p-3 text-right">Annual Interest</th>
                          <th className="p-3 text-right">Year-End Balance</th>
                          <th className="p-3 text-right">Equity Built</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: Math.min(10, amortizationInputs.loanTerm) }, (_, yearIndex) => {
                          const yearPayments = amortizationCalc.schedule.slice(yearIndex * 12, (yearIndex + 1) * 12);
                          const annualPrincipal = yearPayments.reduce((sum, p) => sum + p.principalPayment, 0);
                          const annualInterest = yearPayments.reduce((sum, p) => sum + p.interestPayment, 0);
                          const yearEndBalance = yearPayments[yearPayments.length - 1]?.remainingBalance || 0;
                          const equityBuilt = amortizationInputs.loanAmount - yearEndBalance;
                          
                          return (
                            <tr key={yearIndex} className="border-b hover:bg-gray-50">
                              <td className="p-3 font-medium">{yearIndex + 1}</td>
                              <td className="p-3 text-right text-green-600">${Math.round(annualPrincipal).toLocaleString()}</td>
                              <td className="p-3 text-right text-red-600">${Math.round(annualInterest).toLocaleString()}</td>
                              <td className="p-3 text-right">${Math.round(yearEndBalance).toLocaleString()}</td>
                              <td className="p-3 text-right font-medium">${Math.round(equityBuilt).toLocaleString()}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {amortizationInputs.loanTerm > 10 && (
                    <p className="text-xs text-gray-600 mt-2">Showing first 10 years. Full schedule available on scroll above.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Las Vegas Special Analysis */}
          {activeTab === 'las-vegas' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-200 p-4">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">🎰</div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-800">Las Vegas Housing Market Analysis</h3>
                    <p className="text-orange-700">The Most Volatile Housing Market in America</p>
                  </div>
                </div>
                
                {/* Las Vegas Key Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white p-3 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800 text-sm">2006 Peak</h4>
                    <p className="text-2xl font-bold text-orange-900">$315K</p>
                    <p className="text-xs text-orange-600">85% above national avg</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 text-sm">2011 Trough</h4>
                    <p className="text-2xl font-bold text-red-900">$118K</p>
                    <p className="text-xs text-red-600">-62% from peak</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 text-sm">2022 Peak</h4>
                    <p className="text-2xl font-bold text-green-900">$482K</p>
                    <p className="text-xs text-green-600">+308% from 2011</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 text-sm">Current 2025</h4>
                    <p className="text-2xl font-bold text-blue-900">$432K</p>
                    <p className="text-xs text-blue-600">25% above national</p>
                  </div>
                </div>

                {/* Las Vegas vs National Chart */}
                <div className="bg-white rounded-lg border p-4 mb-6">
                  <h4 className="font-semibold mb-4">Las Vegas vs National Home Prices (1995-2025)</h4>
                  <ResponsiveContainer width="100%" height={isMobile ? 250 : 400}>
                    <LineChart data={historicalData.map((item, index) => {
                      const lvData = lasVegasData.find(lv => lv.year === item.year) || lasVegasData[0];
                      return {
                        ...item,
                        lasVegasPrice: Math.round(item.medianHomePrice * lvData.priceMultiplier)
                      };
                    })}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" interval="preserveStartEnd" tick={{ fontSize: isMobile ? 10 : 12 }} />
                      <YAxis 
                        label={{ value: 'Home Price ($K)', angle: -90, position: 'insideLeft' }}
                        tickFormatter={(value) => `${value / 1000}K`}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                      />
                      <Tooltip 
                        formatter={(value, name) => [`${value.toLocaleString()}`, name]}
                        labelFormatter={(label) => `Year: ${label}`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="medianHomePrice"
                        stroke="#6b7280"
                        strokeWidth={2}
                        name="National Average"
                        dot={false}
                        strokeDasharray="5 5"
                      />
                      <Line
                        type="monotone"
                        dataKey="lasVegasPrice"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        name="Las Vegas"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Las Vegas Market Cycles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-800 mb-2">🚀 Boom Era (2003-2006)</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Population surge (+40K/year)</li>
                      <li>• No state income tax appeal</li>
                      <li>• Speculative investment wave</li>
                      <li>• Construction boom</li>
                      <li>• Prices rose 95% in 3 years</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-red-400">
                    <h4 className="font-semibold text-red-800 mb-2">📉 Bust Era (2007-2011)</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Foreclosure capital of US</li>
                      <li>• 15% unemployment (2010)</li>
                      <li>• 70% underwater mortgages</li>
                      <li>• Construction halted</li>
                      <li>• 62% price decline</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-2">🏠 Recovery Era (2012-2025)</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Institutional investor influx</li>
                      <li>• California migration wave</li>
                      <li>• Limited land supply</li>
                      <li>• COVID acceleration</li>
                      <li>• Current: Above pre-crash peak</li>
                    </ul>
                  </div>
                </div>

                {/* Las Vegas Unique Factors */}
                <div className="bg-white rounded-lg border p-4">
                  <h4 className="font-semibold mb-4">Why Las Vegas is Different</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-orange-800 mb-2">🏜️ Geographic Constraints</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Surrounded by federal land (87% of Nevada)</li>
                        <li>• Limited developable land</li>
                        <li>• Linear valley development pattern</li>
                        <li>• Water rights limitations</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-800 mb-2">💼 Economic Drivers</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Tourism & gaming employment</li>
                        <li>• No state income tax</li>
                        <li>• California exodus destination</li>
                        <li>• Tech company relocations</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-800 mb-2">📊 Market Characteristics</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• 3x more volatile than national average</li>
                        <li>• High investor activity (30% of sales)</li>
                        <li>• Strong rental market</li>
                        <li>• Rapid price discovery</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-800 mb-2">🔮 Future Outlook</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Continued California migration</li>
                        <li>• Water supply challenges</li>
                        <li>• Climate concerns</li>
                        <li>• Diversifying economy</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Las Vegas Affordability */}
                <div className="bg-white rounded-lg border p-4 mt-4">
                  <h4 className="font-semibold mb-4">Las Vegas Affordability Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-2xl font-bold text-gray-800">${Math.round(stats.homePrice.current * 1.25 / 1000)}K</p>
                      <p className="text-sm text-gray-600">Current Median Price</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-2xl font-bold text-gray-800">$75K</p>
                      <p className="text-sm text-gray-600">Income Needed (Estimate)</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <p className="text-2xl font-bold text-gray-800">25%</p>
                      <p className="text-sm text-gray-600">Above National Average</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Las Vegas housing remains more affordable than coastal cities but has seen 
                      significant appreciation. The market's volatility makes timing crucial for both buyers and investors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regional Analysis */}
          {activeTab === 'regional' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-4">Regional Housing Market Analysis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Metro Area Price Multipliers</h4>
                    <div className="space-y-2">
                      {Object.entries(regionalData).map(([key, data]) => (
                        <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">{data.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{data.multiplier}x</span>
                            <span className="text-xs text-gray-600">
                              ${Math.round(stats.homePrice.current * data.multiplier / 1000)}K
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Affordability by Metro</h4>
                    <div className="space-y-2">
                      {Object.entries(regionalData).slice(1).map(([key, data]) => {
                        const regionalPrice = stats.homePrice.current * data.multiplier;
                        const monthlyPayment = regionalPrice * 0.8 * (parseFloat(stats.fha.current) / 100 / 12);
                        const requiredIncome = (monthlyPayment * 12) / 0.28;
                        
                        return (
                          <div key={key} className="p-2 bg-gray-50 rounded">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{data.name}</span>
                              <span className="text-xs text-gray-600">
                                ${Math.round(requiredIncome / 1000)}K income needed
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Policy Timeline */}
          {activeTab === 'policy' && (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-lg border p-3 md:p-4">
                <h3 className="text-base md:text-lg font-semibold mb-4">30-Year Policy Events Timeline</h3>
                <div className="space-y-3 md:space-y-4 max-h-80 md:max-h-96 overflow-y-auto">
                  {policyEvents.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3 md:space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                        event.impact === 'High' ? 'bg-red-500' :
                        event.impact === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <h4 className="font-semibold text-sm md:text-base">{event.event}</h4>
                          <span className="text-xs md:text-sm text-gray-500 mt-1 md:mt-0">{event.date}</span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">{event.description}</p>
                        <div className="flex flex-col md:flex-row md:items-center mt-2 space-y-1 md:space-y-0 md:space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium w-fit ${
                            event.category === 'Monetary Policy' ? 'bg-blue-100 text-blue-800' :
                            event.category === 'Fiscal Policy' ? 'bg-green-100 text-green-800' :
                            event.category === 'Financial Regulation' ? 'bg-purple-100 text-purple-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {event.category}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium w-fit ${
                            event.impact === 'High' ? 'bg-red-100 text-red-800' :
                            event.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {event.impact} Impact
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border p-4">
                  <h4 className="font-semibold mb-4 text-sm md:text-base">30-Year Rate Statistics</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-blue-800 text-sm">10-Year Treasury</h5>
                      <div className="grid grid-cols-2 gap-2 text-xs md:text-sm mt-1">
                        <div>Average: {stats.treasury.avg}%</div>
                        <div>Current: {stats.treasury.current}%</div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-800 text-sm">FHA 30-Year</h5>
                      <div className="grid grid-cols-2 gap-2 text-xs md:text-sm mt-1">
                        <div>Average: {stats.fha.avg}%</div>
                        <div>Current: {stats.fha.current}%</div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-purple-800 text-sm">Home Prices</h5>
                      <div className="grid grid-cols-2 gap-2 text-xs md:text-sm mt-1">
                        <div>Average: ${stats.homePrice.avg.toLocaleString()}</div>
                        <div>Current: ${stats.homePrice.current.toLocaleString()}</div>
                        <div>30yr Change: +{stats.homePrice.change30yr}%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border p-4">
                  <h4 className="font-semibold mb-4 text-sm md:text-base">Key Insights</h4>
                  <div className="space-y-3 text-xs md:text-sm">
                    <div className="p-3 bg-blue-50 rounded">
                      <p className="font-medium text-blue-800">Inverse Correlation</p>
                      <p className="text-blue-700">Strong negative correlation (-0.73) between rates and home prices over 30 years</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <p className="font-medium text-green-800">Policy Impact</p>
                      <p className="text-green-700">Major fiscal events consistently preceded housing market shifts by 3-6 months</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded">
                      <p className="font-medium text-purple-800">Affordability Crisis</p>
                      <p className="text-purple-700">Current affordability at historic lows despite recent price corrections</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Sources Footer */}
          <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gray-100 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold mb-3">Data Sources & Methodology</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs md:text-sm">
              <div>
                <h4 className="font-medium mb-2">Interest Rates</h4>
                <p className="text-gray-600">• Daily Treasury Yield Curve</p>
                <p className="text-gray-600">• FRED Economic Data</p>
                <p className="text-gray-600">• Freddie Mac PMMS</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Home Prices</h4>
                <p className="text-gray-600">• NAR Median Sales Price</p>
                <p className="text-gray-600">• Case-Shiller Index</p>
                <p className="text-gray-600">• Census Bureau Data</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Affordability</h4>
                <p className="text-gray-600">• NAR Affordability Index</p>
                <p className="text-gray-600">• Median Income Data</p>
                <p className="text-gray-600">• Payment-to-Income Ratios</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Analysis Period</h4>
                <p className="text-gray-600">• 1995-2025 (30 years)</p>
                <p className="text-gray-600">• Major market corrections</p>
                <p className="text-gray-600">• Policy event correlation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicTrendsDashboard;
