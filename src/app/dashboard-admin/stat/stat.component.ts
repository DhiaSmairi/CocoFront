import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  registerables } from 'chart.js';
import { CovoiturageService } from '../../services/covoiturage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'chartjs-adapter-moment';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-stat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.css'
})
export class StatComponent  implements OnInit {
  chart: any;
  datasets: any[] = []; // Ajoutez cette propriété pour stocker les données de l'ensemble de données

  constructor(private covoiturageService: CovoiturageService) {}

  ngOnInit() {
    this.covoiturageService.getStatsByUsers().subscribe(
      (stats: any) => {
        const statsArray = Object.values(stats);
        const labels: any[] = [];
        const datasets: any[] = [];

        statsArray.forEach((stat: any, index: number) => {
          const username = stat.username;
          const data = stat.announcementCount;
          
          const colors = ['#FF5733', '#33FF6E', '#336BFF', '#FF33E9', '#E9FF33', '#33FFE9'];
          const color = colors[index % colors.length];

          labels.push(username);

          datasets.push({
            label: username,
            data: [data],
            backgroundColor: color, // Couleur de la barre
            fill: false
          });
        });

        this.datasets = datasets; // Assignez les données à la propriété de classe pour les utiliser dans le modèle

        this.chart = new Chart('canvas', {
          type: 'bar', // Utilisez un graphique en barres
          data: {
            labels: labels,
            datasets: datasets
          },
          options: {
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'User'
                }
              },
              y: {
                beginAtZero: true,
                display: true,
                title: {
                  display: true,
                  text: 'Announcement Count'
                }
              }
            }
          }
        });
      },
      (error) => {
        console.error('Error fetching statistics:', error);
      }
    );
  }
}