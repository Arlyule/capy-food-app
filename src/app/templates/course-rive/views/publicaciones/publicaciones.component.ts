import { Component, OnInit } from '@angular/core';
import { coursesList, courseSectionsList, Course } from '../../models/course';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {

  courses = coursesList;
  courseSections = courseSectionsList;

  constructor() { }

  ngOnInit() { }

  trackCourses(i: number, course: Course) {
    return `${course.title}_${i}`;
  }

  trackAvatarItems(_i: number, num: number) {
    return `avatar_${num}`;
  }
}
