# Usage

`$ createdb step_development`
`$ createdb step_test`

`$ yarn test`
`$ yarn migrate`
`$ yarn migrate:rollback`
`$ NODE_ENV=test yarn migrate`
`$ NODE_ENV=test yarn migrate:rollback`
`$ yarn lint`


### Begin. Then, begin again.
* ###Features
  * ####Could-do list:
    * As a user I can:
      * ######Organize
        * view a list of all projects
        * focus on a project
      * ######Project
        * see a list of all project could-dos
        * transform a could-do into a project
        * reorder could-dos
        * focus on current project
      * ######Focus
        * see a single could-do from selected project
        * click on could-do to complete it
        * click down arrow to cycle through could-dos

  * Could-do idea pile
    * give a could-do a expected time to complete
    * get a positive reinforcement message when completing a could-do
    * can input a time period and am shown a single could-do with a matching expected completion time

  * ######Experience sampling
    * Use the [experience sampling method](https://en.wikipedia.org/wiki/Experience_sampling_method) to collect datas

  * ######User input data tracking
    * As a user I can:
      * set up goals with target number ie. reading code 1000 lines
      * can choose category and inputs amount
      * am rewarded with inspirational method and green/gold colors
      * have access to data about daily progress, weekly/monthly/yearly averages
      * see data displayed as a graph
