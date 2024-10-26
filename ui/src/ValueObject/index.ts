class JobDataVo {
    public requirement: string;  
    public description: string;
    constructor(
      public id: string,
      public job_title: string,
      job_description: string,
      skills: string,            
      public salary: number,
      public location: string,
      public is_active: boolean,
      public created_at: string,
      public created_by: string
    ) {
      this.requirement = skills;
      this.description = job_description;
    }
  }

  export {
    JobDataVo
  }